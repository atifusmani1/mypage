# UX Pilot Labs effect

Open index.html in a browser. It works offline: the effect and its media are inside it.

- index.html: the effect with your settings.
- effect.js: the effect, compiled.
- settings.json: your settings, view and media.
- assets/: your media.
- THIRD-PARTY-NOTICES.txt: notices for the open-source software the effect includes.

To place the effect in your own page, serve the folder over HTTP and add:

```html
<div id="effect" style="width:100%;height:480px"></div>
<script type="module">
  import { mount } from "./effect.js"
  const settings = await (await fetch("./settings.json")).json()
  await mount(document.getElementById("effect"), settings)
</script>
```
