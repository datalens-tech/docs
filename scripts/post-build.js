const walkSync = require('walk-sync');
const cheerio = require('cheerio');
const fs = require('fs');

const META = [
  {name: "theme-color", content: "#efefef"},
  {itemprop: "name", content: ({title})=>title||"DataLens" },
  {itemprop: "description", content: ({description})=>description||"" },
  {itemprop: "image", content: ({lang})=>`/docs/${lang}/_assets/share.png` },
  
  {property: "og:title", content: ({title})=>title||"DataLens" },
  {property: "og:description", content: ({description})=>description||"" },
  {property: "og:type", content: "website" },
  {property: "og:site_name", content: "DataLens" },
  {property: "og:locale", content: ({lang})=>lang },
  {property: "og:image", content: ({lang})=>`/docs/${lang}/_assets/share.png` },
  {property: "og:url", content: ({lang})=>`https://datalens.tech/docs/${lang}/` },

  {name: "twitter:title", content: ({title})=>title||"DataLens" },
  {name: "twitter:description", content: ({description})=>description||"" },
  {name: "twitter:card", content: "summary_large_image" },
  {name: "twitter:image", content: ({lang})=>`/docs/${lang}/_assets/share.png` },
  
  {property: "share:title", content: ({title})=>title||"DataLens" },
  {property: "share:sharing_schema", content: "default" },
]

const LINK = [
  {rel: "icon", href: "/favicon.ico", sizes: "any" },
  {type: "image/x-icon", rel: "shortcut icon", href: "/favicon.ico" },
  {type: "image/png", sizes: "16x16", rel: "icon", href: "/favicon-16x16.png" },
  {type: "image/png", sizes: "32x32", rel: "icon", href: "/favicon-32x32.png" },
  {type: "image/png", sizes: "64x64", rel: "icon", href: "/favicon-64x64.png" },
  {type: "image/png", sizes: "76x76", rel: "icon", href: "/favicon-76x76.png" },
  {type: "image/png", sizes: "120x120", rel: "icon", href: "/favicon-120x120.png" },
  {type: "image/png", sizes: "152x152", rel: "icon", href: "/favicon-152x152.png" },
  {type: "image/png", sizes: "180x180", rel: "icon", href: "/favicon-180x180.png" },
  {type: "image/png", sizes: "192x192", rel: "icon", href: "/favicon-192x192.png" },
  {rel: "apple-touch-icon", href: "/favicon-192x192.png" },
  {rel: "manifest", href: "/manifest.json" },
]

const STYLE_FIX = `
@media (max-width: 768px) {
  .dc-doc-page__controls {
    padding-right: 20px;
    position: static;
    justify-content: flex-end;
  }
}
.yc-root {
  --dc-header-height: 64px;
}

.dc-doc-layout__center {
  top: var(--dc-header-height);
  overflow: auto;
}

.dl-header-container {
  height: 64px;
  width: 100%;
  margin: auto;
  position: fixed;
  z-index: 100;
}

.dl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
  max-width: 1440px;
  padding-right: 4px;
  padding-left: 24px;
  background-color: var(--yc-color-base-background);
  margin: auto;
}

.dl-logo-icon {
  display: flex;
  margin-right: 8px;
  object-fit: contain;
}

.dl-button-lang {
  padding-left: 8px;
}

.yc-root_theme_light .dl-header-logo-icon {
  color: #222;
}

.yc-root_theme_dark .dl-header-logo-icon {
  color: rgba(255, 255, 255, 0.85);
}
`

const SCRIPT_FIX = `
if(sessionStorage.fullScreen === 'true'){
  document.querySelector('.dl-header').style.display = 'none'
}
const fullScreenButton = document.querySelector('.dc-controls.dc-controls_vertical button:first-child')
if(fullScreenButton){
  fullScreenButton.addEventListener('click',()=>{
    const header = document.querySelector('.dl-header')
    header.style.display = sessionStorage.fullScreen === 'true' ? '' : 'none';
  })
}
`

async function main() {
  const basePath = process.argv[2]
  const paths = walkSync(basePath, { directories: false, globs: ['**/*.html'], includeBasePath: true })

  const headerHtml = fs.readFileSync('./scripts/header.html').toString()
  
  for(let i=0;i<paths.length;i+=1){
    const path = paths[i]
    console.log('POST-BUILD:', path.replace(basePath, ''))

    const lang = path.match(/\/(en|ru)\//)[1]

    const fileHtml = fs.readFileSync(path)
    const $ = cheerio.load(fileHtml);

    const head = $('head')
    const body = $('body')

    let title = $('meta[name="title"]')
    if(title) title = title.attr('content')

    let description = $('meta[name="description"]')
    if(description) description = description.attr('content')
    
    META.forEach((meta)=>{
      const tag = $('<meta>')

      Object.entries(meta).forEach(([key,value])=>{
        if (typeof value === 'function') {
          tag.attr(key,value({lang, title, description}))
        } else {
          tag.attr(key,value)
        }
      })

      head.append(tag)
    })

    LINK.forEach((link)=>{
      const tag = $('<link>')

      Object.entries(link).forEach(([key,value])=>{
        tag.attr(key,value)
      })

      head.append(tag)
    })

    const tag = $('<style type="text/css"></style>')
    tag.text(STYLE_FIX)
    head.append(tag)

    const tagScript = $('<script type="application/javascript"></script>')
    tagScript.text(SCRIPT_FIX)
    body.append(tagScript)

    $('#root').before(
      headerHtml
        .replace(/{{lang}}/g, lang)
        .replace(/{{lang_title}}/g, lang === 'ru' ? 'English' : 'Russian')
        .replace(/{{lang_switch}}/g, lang === 'ru' ? 'en' : 'ru')
    );

    const html = $.html()
      .replace(/(\"href\":\".+?\/)index\.html\"/g, '$1"')
      .replace(/( href=\".+?\/)index\.html\"/g, '$1"')
      .replace(/(\"href\":\")index\.html\"/g, '$1./"')
      .replace(/( href=\")index\.html\"/g, '$1./"')
      .replace(/"[^"]+?\/_bundle\/app\.client\.js"/, '"/docs/_bundle/app.client.js"')
      .replace(/"[^"]+?\/_bundle\/app\.client\.css"/, '"/docs/_bundle/app.client.css"')

    fs.writeFileSync(path, html)
  }

}

main().catch((err)=>{
  console.error(err.message || err)
})