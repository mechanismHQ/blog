/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

function MaybeLink(props) {
  if (props.href) {
    return <Link {...props} />;
  }

  return <>{props.children}</>;
}

export default function BlogPostAuthor({ author }) {
  const { name, title, url, imageURL, email, twitter } = author;
  const link = url || (email && `mailto:${email}`) || undefined;
  return (
    <div className="avatar margin-bottom--sm">
      {imageURL && (
        <span className="avatar__photo-link avatar__photo">
          <MaybeLink href={link}>
            <img className={styles.image} src={imageURL} alt={name} />
          </MaybeLink>
        </span>
      )}

      {name && (
        <div
          className="avatar__intro"
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <div className="avatar__name">
            <MaybeLink href={link} itemProp="url">
              <span itemProp="name">{name}</span>
            </MaybeLink>
          </div>
          {twitter && (
            <small className="avatar__subtitle" itemProp="description">
              <Link href={`https://twitter.com/${twitter}`} target="_blank">
                {twitter}
              </Link>
            </small>
          )}
          {title && (
            <small className="avatar__subtitle" itemProp="description">
              {title}
            </small>
          )}
        </div>
      )}
    </div>
  );
}
