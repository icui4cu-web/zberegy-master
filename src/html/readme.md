<!-- links (type: green, blue, yellow, circle, facebook, youtube, twitter) -->
@@include('./component/example.html', {"style": "...", "text": "...", attr: " "href": \"...\" " })

<!-- mor data articles -->
@@loop("_loop-article.html", "../../data.json")
<!-- _loop-article.html
------------------
 <article>
  <h1>@@title</h1>
  @@text
</article> 
------------------- 
data.json
-------------------
[
  { "title": "My post title", "text": "<p>lorem ipsum...</p>" },
  { "title": "Another post", "text": "<p>lorem ipsum...</p>" },
  { "title": "One more post", "text": "<p>lorem ipsum...</p>" }
]
-->