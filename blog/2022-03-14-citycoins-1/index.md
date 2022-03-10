---
draft: true
tags: [CityCoins, PoXL, Tokenomics]
sidebar_label: CityCoins ideas (Part 1)
authors: [hank]
hide_table_of_contents: false
slug: citycoins-proportional-mining-rewards
---

# CityCoins ideas (part 1): Proportional mining rewards

In this post, I’d like to make the case for changing how mining rewards in CityCoins (or any PoXL project) are distributed. Currently, mining is a “winner takes all” model. Instead, I’m advocating for **proportional mining rewards**.

<!--truncate-->

The core thesis behind this change is:

- Proportional rewards will increase miner participation
- Increasing miner participation is good for CityCoins

## PoXL vs PoX

CityCoin’s mining mechanism, Proof-of-Transfer-Lite (PoXL), is an almost direct port of the Stacks Proof-of-Transfer (PoX) mining mechanism. This has many benefits, but PoX is designed around certain goals that CityCoins do not have. The “winner takes all” mining reward is one such example that is needed in PoX, but isn’t required in PoXL.

Stacks mining requires a "leader election" consensus mechanism. The winning miner is responsible for forming an anchor blocks, as well as for proposing a microblock stream in between anchor blocks. CityCoins does not have any requirements for leader election, so there isn’t a need to have a “winning miner”.

## The difficulty of profitable mining

When CityCoins miners participate in mining, many are likely doing so in order to accumulate a project's tokens at a better price than they could receive on the open market.

One simple way to calculate mining profitability is to think of it in expected value (EV) terms. If I commit some amount of STX to mine a block, what is the expected value?

PoXL mining is designed such that your probability of winning a block is equal to the proportion of funds you've committed to that block.

As an example:

- There are 900 STX committed from miners already
- The block reward is worth 2000 STX. In CityCoins projects, the block reward is not in STX, but it can be valued in STX.
- Alice commits 100 STX, bringing the total miner commit to 1000 STX

In this example, Alice has a 10% chance of winning the block (because she committed 100 out of 1000 STX). The expected value for Alice is then:

```
0.1 * 2000 + 0.9 * 0 = 200 STX
```

According to the EV calculation, Alice's expected value is 200 STX - double what she put in! Most of the time, you want to make an EV bet that 2x's your bid.

In reality, Alice will lose 100 STX and get nothing in return 9 times out of 10. In order to have a higher confidence that she'll make money from mining, Alice will need to mine many blocks. So, how many times would Alice need to mine to have a high probability of being +EV?

### Cumulative binomial distributions

PoXL mining is [binomial](https://en.wikipedia.org/wiki/Binomial_distribution) - you either win the block or you lose it. Using statistics, we can evaluate this as a [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) to calculate how often a miner will end up profitable if they mine for a certain number of blocks. Now that the fancy words are out of the way, we'll explain what this means.

We've created a [Google sheet](https://docs.google.com/spreadsheets/d/15ipYxuiMKBAUtat-ojwIS6xM1RoGda6lkpYRpq6QV2g/edit?usp=sharing) that does this math for you. It's pre-populated with a few real-world variables from recently mined MIA blocks.

In our calculator, we assume that a miner has a specific amount of STX that they want to spend to mine CityCoins. With that condition, we can evaluate how likely the miner is profitable if they commit _x_ amount of STX to mining each block.

The more STX a miner commits, the higher their chance of winning the block. However, when they spend more STX, they're not able to mine for as many blocks. Additionally, the more STX committed each block, the higher the _total_ miner commitment is, meaning that miner profitability is lower.

With these factors in mind, we can determine that **the best strategy for PoXL mining is to mine for many block with as few STX per block as possible.** The only downside to this strategy is that it will take a while to mine, meaning you'll have less time receiving Stacking rewards, and you'll have to spend more on transaction fees.

![Profitability probability vs. spend](./%2BProfit%20probability%20vs.%20STX%20spent.png)

As we can see, there quickly becomes a point where your probability of ending of with profit from mining becomes less than 50%.

We can also demonstrate the need to mine for many blocks in order to end up profitable. To visualize this, we can set up a scenario with fixed variables and see how likely it is for a miner to be profitable based on the number of blocks they mined.

In this chart, the miner has a 2% chance of winning, and the miner discount is 11%. Because of this discount, the expected value of mining is +11%. However, actually making a profit depends on the number of blocks they mine.

![profit vs blocks mined](./%2BProfit%20probability%20vs.%20Blocks%20mined.png)

As you can see, you need to mine for thousands of blocks in order to be confident that you’ll make any profit at all, even with a high discount.

All of this is to show that **profitably mining in PoXL is hard and unlikely**.

## Proportionally distributed mining rewards

Now that we've outlined the challenges behind "winner takes all" mining, we can look at an alternative - sharing mining rewards proportionally amongst all miners.

In this model, a miner who commits 10% of the total mining commitment would receive 10% of the total mining rewards for that block.

The best aspect of this alternative is that **it makes profitable mining much easier**. Remember our previous example? The expected value of Alice's mining action was a 2x return, but in reality she'd lose her whole commitment 90% of the time. In this model, Alice will make her 2x return every single time.

By making profitable mining much more likely, our hypothesis is that this will lead to greater involvement in mining. Rational miners will commit to mining as much as possible, up until the point where the total miner commitment is equal to the block reward. In reality, there will likely still be some "miner discount" to account for transaction fees and price variability risk. However, we believe that the net discount will end up being lower in this scheme.

To support the argument that miners are more likely to continue mining as the miner discount gets smaller, we can evaluate a miner's chance of being profitable under these conditions.

In the following chart, we evaluate a scenario where a miner is going to mine 10 STX for 500 blocks. Using the same math as before, we can look at the chance that a miner is profitable as the discount approaches zero.

![Profit vs discount](./%2BProfit%20probability%20vs.%20Discount.png)

As you can see, once the discount is below 10%, this miner can expect to lose money more than 50% of the time. A rational miner should either not mine, or they should commit to mining for many more blocks.

Compare this to proportional mining rewards - **this miner will always be profitable as long as the discount is below zero!**

---

We hope that this post sheds light on a mechanism change to PoXL and CityCoins that aims to increase miner participation. When more STX are committed to mining, that leads to more Stacking rewards and more funds raised for a City. Ultimately, we hope that these kinds of incremental improvements can help CityCoins and other DAOs to achieve overall success.
