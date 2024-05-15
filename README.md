# HQSL Verifier

This is a self-contained HQSL verifier web application, meant to verify cryptographically signed QSL cards. See [HQSL.net](https://hqsl.net) for full details on the HQSL card format and why you might want to use this.

## Installation

Pre-compiled builds are available in [Releases](https://github.com/hamlog-online/hqsl-web/releases/latest).

Everything is actually loaded from a relative URL, so you can deploy it more or less anywhere, it is completely server-agnostic. The code ignores the URL outside of the fragment (`#<fragment>`). Getting issued cards to point at your installation is on you, however.

## Configuration

Configuration is packaged into `index.html`, the compiled version of which (`dist/index.html`) you can edit after build is complete to suit your circumstances:

```html
<script nomodule type="text/plain" class="trusted-key">
  -----BEGIN PGP PUBLIC KEY BLOCK-----
  ....
</script>
```

There can be more than one trusted key script block, all the keys listed this way will be trusted as certifier keys.

List of key servers to use is also defined in the HTML:

```html
<script nomodule type="application/json" id="used-keyservers">
  [
  "https://hqsl.net"
  ]
</script>
````

Callsigns mentioned in the HQSL are linkified, and the link they direct to can be configured as well:

```html
<script nomodule type="application/json" id="callbook">
    "https://www.qrz.com/db/"
</script>
```

The actual link is produced by concatenating this string with the callsign, so if you want to refer to a different callbook, look at how their profile pages work and adjust accordingly.

Print mode generates a QR code from scratch, adding a verifier URL along the way. The URL used for this is also configurable, since your web server might be serving redirects or adding trailing slashes before finally arriving at the `index.html`:

```html
<script nomodule type="application/json" id="verifier">
    "https://hqsl.net/h"
</script>
```

Hash character will be added automatically.

## Tooling

+ `npm run dev` -- Run in development mode.
+ `npm run build` -- Build for deployment in `dist`.
+ `npm run preview` -- Preview the production build.
+ `npm run check` -- Svelte syntax check.

Compiled code lives in `dist`.

## License

This software is released under the terms of MIT license. See [LICENSE](LICENSE).
