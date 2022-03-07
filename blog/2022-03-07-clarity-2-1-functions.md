---
title: New Clarity functions coming in Stacks 2.1
sidebar_label: Clarity 2.1 functions
slug: clarity-2-functions
tags: [Clarity]
---

With the Stacks blockchain's 2.1 upgrade approaching, there is a lot to look forward to. As a Clarity developer, I'm excited about a bunch of new built-in Clarity functions that will be included.

Eager developers can learn about these new functions by digging in to issues and pull requests in the [stacks-blockchain](https://github.com/stacks-network/stacks-blockchain) repository. Because many developers haven't seen these yet, I wanted to highlight them all in a single place.

<!--truncate-->

To see the raw source and documentation for Clarity functions coming in 2.1, [check out the docs file in the `next` branch](https://github.com/stacks-network/stacks-blockchain/commits/next/src/vm/docs/mod.rs).

### `tx-sponsor?`

Stacks supports "sponsored transactions". These are transactions that are signed by a user, as usual, except that the transaction fee is covered by a "sponsor". This can support excellent user experiences, where users don't even need to own STX to make a transaction.

With `tx-sponsor?`, you can have special logic depending on the sponsor. For example, you could have a contract that reimburses STX fees to the sponsor in another asset.

```clarity
(define-public (pay-sponsor)
  (match tx-sponsor?
    sponsor (begin
      ;; do something if this tx is sponsored
      (try! (ft-transfer? my-token u100 tx-sender sponsor))
      (ok true)
    )
    (ok false)
  )
)
```

### `is-in-mainnet`

This one's pretty straightforward - it's a constant variable that returns `true` or `false` based on whether this environment is mainnet. Current contracts will need to have hard-coded flags that need to be changed before being deployed to different environments.

```clarity
;; print a message if on testnet
(define-private (testnet-debug (message (string-ascii 32)))
  (if is-in-mainnet message (print message))
)
```

### Converting buffers to integers

We have a bunch of similar functions for converting buffers to integers. You can create signed or unsigned integers, and can convert from big-endian or little-endian encoding.

The available functions are:

- `buff-to-int-le`
- `buff-to-uint-le`
- `buff-to-int-be`
- `buff-to-uint-be`

One really useful mechanism for this is to convert random hashes into a number, and use that as a random number in your contract. You could, for example, take the `vrf-seed` and convert it into a number, and have random probabilities based on that number.

Given a hash, here's how you can build a "coin flip" function. **This function has not been thoroughly tested**

```clarity
(define-constant max-uint-buff 0xffffffffffffffffffffffffffffffff)
(define-constant max-uint (buff-to-uint-be max-uint-buff))
(define-constant half-uint (/ max-uint u2))

;; given a "random" buffer, return true half of the time.
(define-read-only (coin-flip (buffer (buff 16)))
  (<= (buff-to-uint-be buffer) half-uint)
)
```

The buffer that you input to these functions can only be of length `16`, so you'll have to `slice` longer buffers (like `vrf-seed`). More on that below!

```clarity
;; turn the vrf-seed into a uint
(define-read-only (vrf-to-uint)
  (let
    (
      (vrf-full (unwrap! (get-block-info? vrf-seed block-height) (err u0)))
      (vrf-slice (slice vrf-full u0 u16))
      (vrf (unwrap! (as-max-len? vrf-slice u16) (err u1)))
      (rand-uint (buff-to-uint-be vrf))
    )
    (ok rand-uint)
  )
)
```

### Converting strings to integers (and back)

Now there are native functions for converting strings to integers and integers to strings.

- `int-to-ascii`
- `int-to-utf8`
- `string-to-uint`
- `string-to-int`

For integer conversion, the same function works with both `uint` and `int`. Same for string conversion - you can use `string-ascii` and `string-utf8`.

When converting a string to an integer, the result is `(optional uint)`. If you pass a number that can't be converted, the result is `none`.

```clarity
(int-to-ascii u32) ;; "32"
(string-to-uint "32");; (some u32)
(string-to-uint "not-number") ;; none
```

One example where this could be useful is when you need to add index numbers to strings in a list. Here's a function that does that:

```clarity
(define-read-only (indexed-list (items (list 10 (string-ascii 32))))
  (let
    (
      (iterator { index: u1, names: (list) })
      (fold-result (try! (fold indexed-list-fold items (ok iterator))))
      (names (get names fold-result))
    )
    (ok names)
  )
)

(define-read-only (indexed-list-fold
    (item (string-ascii 32))
    (iterator-resp (response { index: uint, names: (list 10 (string-ascii 35)) } uint))
  )
  (let
    (
      (iterator (try! iterator-resp))
      (names (unwrap! (as-max-len? (get names iterator) u9) (err u0)))
      (index (get index iterator))
      (name-a (concat (int-to-ascii index) ". "))
      (name-full (concat name-a item))
      ;; because our list size is only 10, we know this string can't be more than
      ;; 35 characters. By default, the string type would be (string-ascii 74), to
      ;; account for the largest possible integer.
      (name (unwrap! (as-max-len? name-full u35) (err u1)))
      (new-names (append names name))
    )
    (ok { index: (+ index u1), names: new-names })
  )
)

(try! (indexed-list (list "alice" "bob"))) ;; (list "1. alice" "2. bob")
```

### Slice

`slice` is a very helpful utility when dealing with hashes, buffers, and strings. This function works like `slice` in most languages - it selects the elements between `beginning` and `end` indexes that you specify. This is a crucial utility when parsing a Bitcoin block header, for example.

Previously, you could only use `as-max-len?` if you wanted to take two long strings and concatenate them into a shorter string. For example, imagine you have two tokens A and B. Their on-chain `name` returns a 16-character string, but you want to create a pool whose name is auto-generated with their two names. If you tried that with `as-max-len?`, you'd get a `none` result if either of the names was too long. With `slice`, you can cut off their names if they go too long.

This becomes extra handy when you're trying to conform to traits that limit the length of a result.

**Note about slice**: At the moment, I saw some unintuitive behavior around the length of the result of `slice`. The length of the result of `slice` did not actually shorten to what I was expecting. I had to use `as-max-len?` to do type-safe operations. I'll keep this updated if there are any changes.

```clarity
;; Take two strings and return "${a} ${b} Pool", with a length no longer than 32 characters.
(define-read-only (make-pool-name (name-a (string-ascii 32)) (name-b (string-ascii 32)))
  (let
    (
      (a-short (slice name-a u0 u13))
      (b-short (slice name-b u0 u13))
      (a (concat a-short " "))
      (b (concat b-short " Pool"))
    )
    (concat a b)
  )
)
```

### Comparators for strings and buffs

Clarity already has `>`, `>=`, `<`, and `<=` for integers. In 2.1, you can also use this with strings and buffers.

```clarity
(define-read-only (test-string-comparisons)
  (begin
    (asserts! (> "bbb" "aaa") (err u0))
    (asserts! (>= u"bbb" u"bbb") (err u1))
    (asserts! (< 0x01 0x02) (err u2))
    (ok true)
  )
)
```

### STX account information

You can currently use `stx-get-balance`, but in 2.1 you can get information about the locked balance (through Stacking) for a given principal. This function returns a tuple with `locked`, `unlock-height`, and `unlocked`.

```clarity
(stx-account 'ST000000000000000000002AMW42H)
;; { locked: u0, unlock-height: u0, unlocked: u0 }
```

Here is a simple function that returns `true` if the user is currently stacking:

```clarity
(define-read-only (is-stacking (account principal))
  (if (> (get locked (stx-account account)) u0)
    true
    false
  )
)
```

### STX transfer with memo

Stacks is an account-based protocol, so exchanges typically rely on users having a unique "memo" to associate transfers into their exchange account. This works well for vanilla STX transfers (which support memos), but exchanges won't recognize STX transfers from within contract calls.

In fact, exchanges ran into an issue when users tried to withdraw from one exchange to another. Instead of making dozens of individual transactions, exchanges would prefer to use a "bulk send" contract call. This works well, except that you can't natively include a memo. The ecosystem ended up developing a special `send-many-memo` contract that would `print` memos, and exchanges could use an API to recognize these transfers.

Using a special contract is messy, though. The new `stx-transfer-memo?` function will simplify all this.

```clarity
(stx-transfer-memo? u1234 tx-sender 'ST000000000000000000002AMW42H 0x010203)
```

### `is-standard`

The `is-standard` function simply checks to see if a given `principal` is in the correct format for the current network. This allows for additional safety - if a user sends tokens to a principal that could never spend them (on this network), that would be a bad outcome.

```clarity
(is-standard 'STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6) ;; returns true on testnet and false on mainnet
(is-standard 'STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6.foo) ;; returns true on testnet and false on mainnet
(is-standard 'SP3X6QWWETNBZWGBK6DRGTR1KX50S74D3433WDGJY) ;; returns true on mainnet and false on testnet
(is-standard 'SP3X6QWWETNBZWGBK6DRGTR1KX50S74D3433WDGJY.foo) ;; returns true on mainnet and false on testnet
(is-standard 'SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR) ;; returns false on both mainnet and testnet
```

### `principal-of`

`principal-of` converts a public key to a standard STX address. This was already built in Stacks 2.0, but it shipped with a bug on mainnet. On mainnet, the result would return a testnet-formatted address. Unfortunately, that made this function mostly useless. The fix had to wait until 2.1 because fixing it would technically be consensus-breaking, so it needed to be in a hard fork.

I've found that there are a ton of interesting use cases for `principal-of`. It allows for all sorts of off-chain signatures to execute address-specific logic in a contract.

For example, imagine a voting contract. The contract keeps track of what individual users vote on. This could get expensive with lots of voters. Instead, signatures could be generated offline and then submitted on-chain in a single batch transaction.

```clarity
(define-map votes-map principal uint)

;; submit a list of votes, with signatures generated off-chain
(define-public (batch-votes (votes (list 20 { signature: (buff 65), proposal: uint })))
  (ok (map process-vote votes))
)

(define-public (process-vote (vote { signature: (buff 65), proposal: uint }))
  (let
    (
      (proposal (get proposal vote))
      (message-hash (sha256 proposal))
      (public-key (unwrap! (secp256k1-recover? message-hash (get signature vote)) (err u0)))
      (voter (unwrap! (principal-of? public-key) (err u1)))
    )
    (map-set votes-map voter proposal)
    (ok true)
  )
)
```
