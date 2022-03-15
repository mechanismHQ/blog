"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[103],{8665:function(e,t,a){a.d(t,{Z:function(){return b}});var n=a(3366),l=a(7294),r=a(6010),i=a(7014),m=a(9960),o="sidebar_a9qW",s="sidebarItemTitle_uKok",c="sidebarItemList_Kvuv",u="sidebarItem_CF0Q",d="sidebarItemLink_miNk",g="sidebarItemLinkActive_RRTD",p=a(5999);function v(e){var t=e.sidebar;return 0===t.items.length?null:l.createElement("nav",{className:(0,r.Z)(o,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,r.Z)(s,"margin-bottom--md")},t.title),l.createElement("ul",{className:c},t.items.map((function(e){return l.createElement("li",{key:e.permalink,className:u},l.createElement(m.Z,{isNavLink:!0,to:e.permalink,className:d,activeClassName:g},e.title))}))))}var h=["sidebar","toc","children"];function b(e){var t=e.sidebar,a=e.toc,m=e.children,o=(0,n.Z)(e,h),s=t&&t.items.length>0;return l.createElement(i.Z,o,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},s&&l.createElement("aside",{className:"col col--3"},l.createElement(v,{sidebar:t})),l.createElement("main",{className:(0,r.Z)("col",{"col--7":s,"col--9 col--offset-1":!s}),itemScope:!0,itemType:"http://schema.org/Blog"},m),a&&l.createElement("div",{className:"col col--2"},a))))}},742:function(e,t,a){a.d(t,{Z:function(){return A}});var n=a(7294),l=a(6010),r=a(3905),i=a(5999),m=a(9960),o=a(4996),s=a(9366),c=a(8780),u=a(66),d=a(7462),g=a(3366),p="iconEdit_dcUD",v=["className"];function h(e){var t=e.className,a=(0,g.Z)(e,v);return n.createElement("svg",(0,d.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(p,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function b(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:s.kM.common.editThisPage},n.createElement(h,null),n.createElement(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var E="blogPostTitle_rzP5",f="blogPostData_Zg1s",_="blogPostDetailsFull_h6_j",N=a(7774),Z="tags_XVD_",k="tag_JSN8";function P(e){var t=e.tags;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,l.Z)(Z,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return n.createElement("li",{key:a,className:k},n.createElement(N.Z,{name:t,permalink:a}))}))))}var L="image_xS9F";function C(e){return e.href?n.createElement(m.Z,e):n.createElement(n.Fragment,null,e.children)}function T(e){var t=e.author,a=t.name,l=t.title,r=t.url,i=t.imageURL,o=t.email,s=t.twitter,c=r||o&&"mailto:"+o||void 0;return n.createElement("div",{className:"avatar margin-bottom--sm"},i&&n.createElement("span",{className:"avatar__photo-link avatar__photo"},n.createElement(C,{href:c},n.createElement("img",{className:L,src:i,alt:a}))),a&&n.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},n.createElement("div",{className:"avatar__name"},n.createElement(C,{href:c,itemProp:"url"},n.createElement("span",{itemProp:"name"},a))),s&&n.createElement("small",{className:"avatar__subtitle",itemProp:"description"},n.createElement(m.Z,{href:"https://twitter.com/"+s,target:"_blank"},s)),l&&n.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))}var w="authorCol_FlmR",y="imageOnlyAuthorRow_trpF",I="imageOnlyAuthorCol_S2np";function x(e){var t=e.authors,a=e.assets;if(0===t.length)return null;var r=t.every((function(e){return!e.name}));return n.createElement("div",{className:(0,l.Z)("margin-top--md margin-bottom--sm",r?y:"row")},t.map((function(e,t){var i;return n.createElement("div",{className:(0,l.Z)(!r&&"col col--6",r?I:w),key:t},n.createElement(T,{author:Object.assign({},e,{imageURL:null!=(i=a.authorsImageUrls[t])?i:e.imageURL})}))})))}function A(e){var t,a,d,g=(d=(0,s.c2)().selectMessage,function(e){var t=Math.ceil(e);return d(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),p=(0,o.C)().withBaseUrl,v=e.children,h=e.frontMatter,N=e.assets,Z=e.metadata,k=e.truncated,L=e.isBlogPostPage,C=void 0!==L&&L,T=Z.date,w=Z.formattedDate,y=Z.permalink,I=Z.tags,A=Z.readingTime,H=Z.title,M=Z.editUrl,R=Z.authors,U=null!=(t=N.image)?t:h.image,B=!C&&k,D=I.length>0,F=C?"h1":"h2";return n.createElement("article",{className:C?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},n.createElement("header",null,n.createElement(F,{className:E,itemProp:"headline"},C?H:n.createElement(m.Z,{itemProp:"url",to:y},H)),n.createElement("div",{className:(0,l.Z)(f,"margin-vert--md")},n.createElement("time",{dateTime:T,itemProp:"datePublished"},w),void 0!==A&&n.createElement(n.Fragment,null," \xb7 ",g(A))),n.createElement(x,{authors:R,assets:N})),U&&n.createElement("meta",{itemProp:"image",content:p(U,{absolute:!0})}),n.createElement("div",{id:C?c.blogPostContainerID:void 0,className:"markdown",itemProp:"articleBody"},n.createElement(r.Zo,{components:u.Z},v)),(D||k)&&n.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(a={},a[_]=C,a))},D&&n.createElement("div",{className:(0,l.Z)("col",{"col--9":B})},n.createElement(P,{tags:I})),C&&M&&n.createElement("div",{className:"col margin-top--sm"},n.createElement(b,{editUrl:M})),B&&n.createElement("div",{className:(0,l.Z)("col text--right",{"col--3":D})},n.createElement(m.Z,{to:Z.permalink,"aria-label":(0,i.I)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:H})},n.createElement("b",null,n.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},9360:function(e,t,a){a.r(t),a.d(t,{default:function(){return g}});var n=a(7294),l=a(1217),r=a(8665),i=a(742),m=a(7462),o=a(5999),s=a(1750);function c(e){var t=e.nextItem,a=e.prevItem;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,o.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},n.createElement("div",{className:"pagination-nav__item"},a&&n.createElement(s.Z,(0,m.Z)({},a,{subLabel:n.createElement(o.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")}))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&n.createElement(s.Z,(0,m.Z)({},t,{subLabel:n.createElement(o.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")}))))}var u=a(9366),d=a(4853);function g(e){var t,a=e.content,m=e.sidebar,o=a.assets,s=a.metadata,g=s.title,p=s.description,v=s.nextItem,h=s.prevItem,b=s.date,E=s.tags,f=s.authors,_=s.frontMatter,N=_.hide_table_of_contents,Z=_.keywords,k=_.toc_min_heading_level,P=_.toc_max_heading_level,L=null!=(t=o.image)?t:_.image;return n.createElement(r.Z,{wrapperClassName:u.kM.wrapper.blogPages,pageClassName:u.kM.page.blogPostPage,sidebar:m,toc:!N&&a.toc&&a.toc.length>0?n.createElement(d.Z,{toc:a.toc,minHeadingLevel:k,maxHeadingLevel:P}):void 0},n.createElement(l.Z,{title:g,description:p,keywords:Z,image:L},n.createElement("meta",{property:"og:type",content:"article"}),n.createElement("meta",{property:"article:published_time",content:b}),f.some((function(e){return e.url}))&&n.createElement("meta",{property:"article:author",content:f.map((function(e){return e.url})).filter(Boolean).join(",")}),E.length>0&&n.createElement("meta",{property:"article:tag",content:E.map((function(e){return e.label})).join(",")})),n.createElement(i.Z,{frontMatter:_,assets:o,metadata:s,isBlogPostPage:!0},n.createElement(a,null)),(v||h)&&n.createElement(c,{nextItem:v,prevItem:h}))}},1750:function(e,t,a){a.d(t,{Z:function(){return r}});var n=a(7294),l=a(9960);function r(e){var t=e.permalink,a=e.title,r=e.subLabel;return n.createElement(l.Z,{className:"pagination-nav__link",to:t},r&&n.createElement("div",{className:"pagination-nav__sublabel"},r),n.createElement("div",{className:"pagination-nav__label"},a))}},4853:function(e,t,a){a.d(t,{Z:function(){return g}});var n=a(7462),l=a(3366),r=a(7294),i=a(6010),m=a(9366),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function s(e){var t=e.toc,a=e.className,n=e.linkClassName,l=e.isChild;return t.length?r.createElement("ul",{className:l?void 0:a},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:null!=n?n:void 0,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(s,{isChild:!0,toc:e.children,className:a,linkClassName:n}))}))):null}function c(e){var t=e.toc,a=e.className,i=void 0===a?"table-of-contents table-of-contents__left-border":a,c=e.linkClassName,u=void 0===c?"table-of-contents__link":c,d=e.linkActiveClassName,g=void 0===d?void 0:d,p=e.minHeadingLevel,v=e.maxHeadingLevel,h=(0,l.Z)(e,o),b=(0,m.LU)(),E=null!=p?p:b.tableOfContents.minHeadingLevel,f=null!=v?v:b.tableOfContents.maxHeadingLevel,_=(0,m.b9)({toc:t,minHeadingLevel:E,maxHeadingLevel:f}),N=(0,r.useMemo)((function(){if(u&&g)return{linkClassName:u,linkActiveClassName:g,minHeadingLevel:E,maxHeadingLevel:f}}),[u,g,E,f]);return(0,m.Si)(N),r.createElement(s,(0,n.Z)({toc:_,className:i,linkClassName:u},h))}var u="tableOfContents_cNA8",d=["className"];function g(e){var t=e.className,a=(0,l.Z)(e,d);return r.createElement("div",{className:(0,i.Z)(u,"thin-scrollbar",t)},r.createElement(c,(0,n.Z)({},a,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},7774:function(e,t,a){a.d(t,{Z:function(){return s}});var n=a(7294),l=a(6010),r=a(9960),i="tag_hD8n",m="tagRegular_D6E_",o="tagWithCount_i0QQ";function s(e){var t,a=e.permalink,s=e.name,c=e.count;return n.createElement(r.Z,{href:a,className:(0,l.Z)(i,(t={},t[m]=!c,t[o]=c,t))},s,c&&n.createElement("span",null,c))}}}]);