( function ( global ) {
  'use strict';

  var VERSION = '1.3.0';

  // ── Embedded product images ──────────────────────────────────────────────
  var IMAGES = {
    '2': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028428251/XPvJbWXgBEsIfuSA.png',
    '3': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028428251/IkYYtErehHafeoRm.png',
    '6': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028428251/EeqHwNgpAxekOVCj.png'
  };

  // ── Payment icons ────────────────────────────────────────────────────────
  var AMEX_CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028428251/UBvV5wJZ8ZDuFe37KDNuE3/amex-card_e233c254.png';
  function makeImgIcon( src, label, w, h ) {
    w = w || 36; h = h || 23;
    return '<span style="display:inline-flex;align-items:center;justify-content:center;'
      + 'width:' + w + 'px;height:' + h + 'px;border-radius:4px;overflow:hidden;border:1px solid rgba(0,0,0,0.10);'
      + 'background:#fff;flex-shrink:0;" title="' + label + '">'
      + '<img src="' + src + '" alt="' + label + '" style="width:100%;height:100%;object-fit:cover;display:block;"/>'
      + '</span>';
  }
  function makeCardIcon( svgContent, label, w, h ) {
    w = w || 36; h = h || 23;
    return '<span style="display:inline-flex;align-items:center;justify-content:center;'
      + 'width:' + w + 'px;height:' + h + 'px;border-radius:4px;overflow:hidden;border:1px solid rgba(0,0,0,0.10);'
      + 'background:#fff;flex-shrink:0;" title="' + label + '">'
      + '<svg viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg" '
      + 'width="' + w + '" height="' + h + '" style="display:block;">'
      + svgContent
      + '</svg>'
      + '</span>';
  }

  var CARD_INNER = {
    visa: "<g clip-path=\"url(#clip0_6278_125833)\"> <path d=\"M780 0H0V500H780V0Z\" fill=\"#1434CB\"/> <path d=\"M489.823 143.111C442.988 143.111 401.134 167.393 401.134 212.256C401.134 263.706 475.364 267.259 475.364 293.106C475.364 303.989 462.895 313.731 441.6 313.731C411.377 313.731 388.789 300.119 388.789 300.119L379.123 345.391C379.123 345.391 405.145 356.889 439.692 356.889C490.898 356.889 531.19 331.415 531.19 285.784C531.19 231.419 456.652 227.971 456.652 203.981C456.652 195.455 466.887 186.114 488.122 186.114C512.081 186.114 531.628 196.014 531.628 196.014L541.087 152.289C541.087 152.289 519.818 143.111 489.823 143.111ZM61.3294 146.411L60.1953 153.011C60.1953 153.011 79.8988 156.618 97.645 163.814C120.495 172.064 122.122 176.868 125.971 191.786L167.905 353.486H224.118L310.719 146.411H254.635L198.989 287.202L176.282 167.861C174.199 154.203 163.651 146.411 150.74 146.411H61.3294ZM333.271 146.411L289.275 353.486H342.756L386.598 146.411H333.271ZM631.554 146.411C618.658 146.411 611.825 153.318 606.811 165.386L528.458 353.486H584.542L595.393 322.136H663.72L670.318 353.486H719.805L676.633 146.411H631.554ZM638.848 202.356L655.473 280.061H610.935L638.848 202.356Z\" fill=\"white\"/> </g> <defs> <clipPath id=\"clip0_6278_125833\"> <rect width=\"780\" height=\"500\" fill=\"white\"/> </clipPath> </defs>",
    mc: "<g clip-path=\"url(#clip0_6278_125825)\"> <path d=\"M780 0H0V500H780V0Z\" fill=\"#253747\"/> <path d=\"M211.053 467.045V438.109C211.053 427.041 204.311 419.793 192.736 419.793C186.949 419.793 180.657 421.703 176.33 427.996C172.959 422.715 168.127 419.793 160.879 419.793C156.047 419.793 151.215 421.254 147.395 426.535V420.748H137.281V467.045H147.395V441.481C147.395 433.278 151.721 429.401 158.463 429.401C165.205 429.401 168.577 433.727 168.577 441.481V467.045H178.69V441.481C178.69 433.278 183.522 429.401 189.759 429.401C196.501 429.401 199.872 433.727 199.872 441.481V467.045H211.053ZM361.068 420.748H344.662V406.758H334.549V420.748H325.391V429.906H334.549V451.145C334.549 461.764 338.875 468 350.449 468C354.776 468 359.608 466.539 362.979 464.629L360.057 455.92C357.135 457.831 353.764 458.336 351.348 458.336C346.516 458.336 344.606 455.415 344.606 450.639V429.906H361.012V420.748H361.068ZM446.92 419.737C441.133 419.737 437.256 422.658 434.84 426.479V420.692H424.727V466.989H434.84V440.919C434.84 433.221 438.211 428.839 444.504 428.839C446.414 428.839 448.83 429.345 450.797 429.794L453.718 420.13C451.696 419.737 448.83 419.737 446.92 419.737ZM317.187 424.569C312.356 421.198 305.613 419.737 298.365 419.737C286.791 419.737 279.094 425.524 279.094 434.682C279.094 442.38 284.881 446.762 294.994 448.167L299.826 448.672C305.108 449.628 308.029 451.088 308.029 453.504C308.029 456.875 304.152 459.291 297.41 459.291C290.668 459.291 285.33 456.875 281.959 454.459L277.127 462.157C282.409 466.034 289.657 467.944 296.904 467.944C310.389 467.944 318.143 461.651 318.143 452.999C318.143 444.796 311.85 440.469 302.242 439.008L297.41 438.503C293.084 437.997 289.713 437.042 289.713 434.176C289.713 430.805 293.084 428.895 298.421 428.895C304.209 428.895 309.996 431.311 312.917 432.772L317.187 424.569ZM586.26 419.737C580.473 419.737 576.596 422.658 574.18 426.479V420.692H564.067V466.989H574.18V440.919C574.18 433.221 577.551 428.839 583.844 428.839C585.754 428.839 588.17 429.345 590.137 429.794L593.059 420.242C591.092 419.737 588.227 419.737 586.26 419.737ZM457.033 443.897C457.033 457.887 466.697 468 481.643 468C488.385 468 493.217 466.539 498.049 462.719L493.217 454.516C489.34 457.437 485.519 458.842 481.137 458.842C472.934 458.842 467.147 453.055 467.147 443.897C467.147 435.188 472.934 429.401 481.137 428.951C485.463 428.951 489.34 430.412 493.217 433.278L498.049 425.074C493.217 421.198 488.385 419.793 481.643 419.793C466.697 419.737 457.033 429.906 457.033 443.897ZM550.582 443.897V420.748H540.469V426.535C537.098 422.209 532.266 419.793 525.973 419.793C512.938 419.793 502.825 429.906 502.825 443.897C502.825 457.887 512.938 468 525.973 468C532.715 468 537.547 465.584 540.469 461.258V467.045H550.582V443.897ZM513.444 443.897C513.444 435.693 518.725 428.951 527.434 428.951C535.637 428.951 541.424 435.244 541.424 443.897C541.424 452.1 535.637 458.842 527.434 458.842C518.781 458.336 513.444 452.043 513.444 443.897ZM392.42 419.737C378.935 419.737 369.271 429.401 369.271 443.84C369.271 458.336 378.935 467.944 392.926 467.944C399.668 467.944 406.41 466.034 411.748 461.651L406.916 454.403C403.039 457.325 398.207 459.235 393.431 459.235C387.139 459.235 380.902 456.314 379.441 448.167H413.658C413.658 446.706 413.658 445.751 413.658 444.29C414.108 429.401 405.399 419.737 392.42 419.737ZM392.42 428.446C398.713 428.446 403.039 432.322 403.994 439.514H379.891C380.846 433.278 385.172 428.446 392.42 428.446ZM643.682 443.897V402.432H633.568V426.535C630.197 422.209 625.365 419.793 619.073 419.793C606.037 419.793 595.924 429.906 595.924 443.897C595.924 457.887 606.037 468 619.073 468C625.815 468 630.647 465.584 633.568 461.258V467.045H643.682V443.897ZM606.543 443.897C606.543 435.693 611.825 428.951 620.533 428.951C628.736 428.951 634.524 435.244 634.524 443.897C634.524 452.1 628.736 458.842 620.533 458.842C611.825 458.336 606.543 452.043 606.543 443.897ZM267.969 443.897V420.748H257.855V426.535C254.484 422.209 249.652 419.793 243.36 419.793C230.325 419.793 220.211 429.906 220.211 443.897C220.211 457.887 230.325 468 243.36 468C250.102 468 254.934 465.584 257.855 461.258V467.045H267.969V443.897ZM230.381 443.897C230.381 435.693 235.662 428.951 244.371 428.951C252.574 428.951 258.361 435.244 258.361 443.897C258.361 452.1 252.574 458.842 244.371 458.842C235.662 458.336 230.381 452.043 230.381 443.897Z\" fill=\"white\"/> <path d=\"M465.738 69.1387H313.812V342.088H465.738V69.1387Z\" fill=\"#FF5A00\"/> <path d=\"M323.926 205.613C323.926 150.158 349.996 100.94 390 69.1387C360.559 45.9902 323.42 32 282.91 32C186.945 32 109.297 109.648 109.297 205.613C109.297 301.578 186.945 379.227 282.91 379.227C323.42 379.227 360.559 365.237 390 342.088C349.94 310.737 323.926 261.069 323.926 205.613Z\" fill=\"#EB001B\"/> <path d=\"M670.711 205.613C670.711 301.578 593.062 379.227 497.098 379.227C456.588 379.227 419.449 365.237 390.008 342.088C430.518 310.231 456.082 261.069 456.082 205.613C456.082 150.158 430.012 100.94 390.008 69.1387C419.393 45.9902 456.532 32 497.041 32C593.062 32 670.711 110.154 670.711 205.613Z\" fill=\"#F79E1B\"/> </g> <defs> <clipPath id=\"clip0_6278_125825\"> <rect width=\"780\" height=\"500\" fill=\"white\"/> </clipPath> </defs>",
    discover: "<g fill-rule=\"evenodd\"><path d=\"M54.992 0C0 0 0 0 0 0v0C0 0 0 0 0 501h670.016C755.373 501 780 476.37 780 445.996V0C0 0 755.381 0 725.008 0H54.992z\" fill=\"#4D4D4D\"/><path d=\"M327.152 161.893c8.837 0 16.248 1.784 25.268 6.09v22.751c-8.544-7.863-15.955-11.154-25.756-11.154-19.264 0-34.414 15.015-34.414 34.05 0 20.075 14.681 34.196 35.37 34.196 9.312 0 16.586-3.12 24.8-10.857v22.763c-9.341 4.14-16.911 5.776-25.756 5.776-31.278 0-55.582-22.596-55.582-51.737 0-28.826 24.951-51.878 56.07-51.878zm-97.113.627c11.546 0 22.11 3.72 30.943 10.994l-10.748 13.248c-5.35-5.646-10.41-8.028-16.564-8.028-8.853 0-15.3 4.745-15.3 10.989 0 5.354 3.619 8.188 15.944 12.482 23.365 8.044 30.29 15.176 30.29 30.926 0 19.193-14.976 32.553-36.32 32.553-15.63 0-26.994-5.795-36.458-18.872l13.268-12.03c4.73 8.61 12.622 13.222 22.42 13.222 9.163 0 15.947-5.952 15.947-13.984 0-4.164-2.055-7.734-6.158-10.258-2.066-1.195-6.158-2.977-14.2-5.647-19.291-6.538-25.91-13.527-25.91-27.185 0-16.225 14.214-28.41 32.846-28.41zm234.723 1.728h22.437l28.084 66.592 28.446-66.592h22.267l-45.494 101.686h-11.053l-44.687-101.686zm-397.348.152h30.15c33.312 0 56.534 20.382 56.534 49.641 0 14.59-7.104 28.696-19.118 38.057-10.108 7.901-21.626 11.445-37.574 11.445H67.414V164.4zm96.135 0h20.54v99.143h-20.54V164.4zm411.734 0h58.252v16.8H595.81v22.005h36.336v16.791h-36.336v26.762h37.726v16.785h-58.252V164.4zm71.858 0h30.455c23.69 0 37.265 10.71 37.265 29.272 0 15.18-8.514 25.14-23.986 28.105l33.148 41.766h-25.26l-28.429-39.828h-2.678v39.828h-20.515V164.4zm20.515 15.616v30.025h6.002c13.117 0 20.069-5.362 20.069-15.328 0-9.648-6.954-14.697-19.745-14.697h-6.326zM87.94 181.199v65.559h5.512c13.273 0 21.656-2.394 28.11-7.88 7.103-5.955 11.376-15.465 11.376-24.98 0-9.499-4.273-18.725-11.376-24.681-6.785-5.78-14.837-8.018-28.11-8.018H87.94z\" fill=\"#FFF\"/><path d=\"M415.13 161.213c30.941 0 56.022 23.58 56.022 52.709v.033c0 29.13-25.081 52.742-56.021 52.742s-56.022-23.613-56.022-52.742v-.033c0-29.13 25.082-52.71 56.022-52.71zM779.983 288.36c-26.05 18.33-221.077 149.34-558.754 212.623H724.99c30.365 0 54.992-0 54.992-0V0z\" fill=\"#F47216\"/></g>",
    amex: "<rect width=\"780\" height=\"500\" fill=\"#2557D6\"/><path d=\"m0.253 235.69h37.441l8.442-19.51h18.9l8.42 19.51h73.668v-14.915l6.576 14.98h38.243l6.576-15.202v15.138h183.08l-0.085-32.026h3.542c2.479 0.083 3.204 0.302 3.204 4.226v27.8h94.689v-7.455c7.639 3.92 19.518 7.455 35.148 7.455h39.836l8.525-19.51h18.9l8.337 19.51h76.765v-18.532l11.626 18.532h61.515v-122.51h-60.88v14.468l-8.522-14.468h-62.471v14.468l-7.828-14.468h-84.38c-14.123 0-26.539 1.889-36.569 7.153v-7.153h-58.229v7.153c-6.383-5.426-15.079-7.153-24.75-7.153h-212.74l-14.274 31.641-14.659-31.641h-67.005v14.468l-7.362-14.468h-57.145l-26.539 58.246v64.261h3e-3z\" fill=\"#fff\"/>"
  };

  function paymentIconsHTML( size ) {
    var w = size === 'lg' ? 46 : 36;
    var h = size === 'lg' ? 30 : 23;
    return makeCardIcon( CARD_INNER.visa, 'Visa', w, h )
      + makeCardIcon( CARD_INNER.mc, 'Mastercard', w, h )
      + makeCardIcon( CARD_INNER.discover, 'Discover', w, h )
      + makeImgIcon( AMEX_CDN, 'Amex', w, h );
  }

  // ── Guarantee badge ──────────────────────────────────────────────────────
  // Neurotyde colors: navy #0d1b4b, gold #c9a227
  var BADGE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="72" height="72">'
    + '<circle cx="45" cy="45" r="43" fill="#c9a227" stroke="#e8c84a" stroke-width="2"/>'
    + '<circle cx="45" cy="45" r="36" fill="#0d1b4b"/>'
    + '<text x="45" y="30" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#e8c84a">MONEY BACK</text>'
    + '<text x="45" y="48" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#e8c84a">100%</text>'
    + '<text x="45" y="62" text-anchor="middle" font-family="Arial" font-size="7.5" font-weight="bold" fill="#e8c84a">GUARANTEED</text>'
    + '</svg>';

  // ── Shared helper ────────────────────────────────────────────────────────
  function getAttr( el, key, fallback ) {
    return el.getAttribute( 'data-' + key ) || fallback;
  }

  // ── Always Variant A ─────────────────────────────────────────────────────
  function pickVariant() {
    return 'A';
  }

  // ── CSS — Variant A only (Neurotyde navy + gold palette) ─────────────────
  var CSS_A = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    .vc-a-bump-wrapper {
      font-family: 'Inter', sans-serif;
      width: 100%;
      box-sizing: border-box;
      padding: 40px 16px 16px;
      background: transparent;
    }
    .vc-a-bump-title {
      text-align: center;
      font-size: clamp(18px, 3vw, 26px);
      font-weight: 800;
      color: #0d1b4b;
      margin-bottom: 8px;
      letter-spacing: -0.3px;
    }
    .vc-a-bump-subtitle {
      text-align: center;
      font-size: clamp(13px, 2vw, 15px);
      color: #555;
      margin-bottom: 32px;
    }
    .vc-a-bump-grid {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 0;
      row-gap: 40px;
      max-width: 400px;
      margin: 0 auto;
    }
    @media (min-width: 1024px) {
      .vc-a-bump-grid {
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 20px;
        row-gap: 0;
        max-width: 1060px;
        align-items: center;
      }
      .vc-a-bump-grid .vc-a-card { order: var(--vc-order-desktop, 0); }
    }
    @media (max-width: 1023px) {
      .vc-a-bump-grid .vc-a-card { order: var(--vc-order-mobile, 0); }
    }
    .vc-a-card {
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 40%, #e8edf8 70%, #c8d0e8 100%);
      border-radius: 18px;
      border: 2px solid #c9a227;
      padding: 28px 24px 24px;
      flex: 1 1 300px;
      max-width: 360px;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      position: relative;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease, border-color 0.2s ease;
      box-shadow: 0 2px 12px rgba(13,27,75,0.10);
    }
    .vc-a-card:not(.vc-a-best):hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 16px 40px rgba(201,162,39,0.22), 0 4px 14px rgba(0,0,0,0.07);
      border-color: #c9a227;
      text-decoration: none;
      color: inherit;
    }
    .vc-a-card:hover .vc-a-img-wrap img {
      transform: scale(1.10) translateY(-6px);
      filter: drop-shadow(0 0 16px rgba(201,162,39,0.45)) drop-shadow(0 8px 18px rgba(0,0,0,0.14));
    }
    .vc-a-card.vc-a-best {
      border-color: #c9a227;
      border-width: 2.5px;
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 35%, #1a2e6e 70%, #0d1b4b 100%);
      color: #f0f0f0;
      box-shadow: 0 12px 40px rgba(201,162,39,0.30), 0 4px 16px rgba(0,0,0,0.25);
      transform: scale(1.06);
      z-index: 2;
      max-width: 400px;
      padding: 32px 26px 26px;
    }
    .vc-a-card.vc-a-best:hover {
      transform: translateY(-10px) scale(1.10);
      border-color: #e8c84a;
      border-width: 3px;
      box-shadow: 0 28px 60px rgba(201,162,39,0.45), 0 0 0 4px rgba(232,200,74,0.22), 0 6px 20px rgba(0,0,0,0.10);
    }
    .vc-a-card.vc-a-best .vc-a-card-headline { color: #e8c84a; }
    .vc-a-card.vc-a-best .vc-a-card-header { border-color: rgba(201,162,39,0.35); }
    .vc-a-card.vc-a-best .vc-a-price-unit { color: #fff; }
    .vc-a-card.vc-a-best .vc-a-guarantee-text { color: rgba(255,255,255,0.85); }
    .vc-a-card.vc-a-best .vc-a-total-row { color: #fff; }
    .vc-a-card.vc-a-best .vc-a-total-label { color: #fff; }
    .vc-a-card.vc-a-best .vc-a-total-full { color: rgba(255,255,255,0.55); }
    .vc-a-card.vc-a-best .vc-a-total-now { color: #fff; }
    .vc-a-card.vc-a-best .vc-a-card-desc { color: rgba(255,255,255,0.75); }
    .vc-a-badge-top {
      position: absolute;
      top: -22px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, #e8c84a, #c9a227, #8a6510);
      color: #0d1b4b;
      font-size: 15px;
      font-weight: 900;
      padding: 9px 32px;
      border-radius: 30px;
      white-space: nowrap;
      letter-spacing: 1.2px;
      box-shadow: 0 4px 18px rgba(201,162,39,0.70), 0 2px 0 rgba(255,255,255,0.30) inset;
      text-transform: uppercase;
      min-width: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255,255,255,0.50);
    }
    .vc-a-card-header {
      width: 100%;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0d4a0;
      margin-bottom: 16px;
    }
    .vc-a-card-headline { font-size: 20px; font-weight: 800; color: #0d1b4b; margin-bottom: 4px; }
    .vc-a-card-desc { font-size: 13px; color: #888; font-weight: 500; }
    .vc-a-img-wrap {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 12px;
      min-height: 189px;
    }
    .vc-a-img-wrap img {
      max-width: 100%;
      max-height: 228px;
      object-fit: contain;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease;
      filter: drop-shadow(0 6px 14px rgba(0,0,0,0.12));
    }
    .vc-a-guarantee-badge { position: absolute; bottom: -8px; right: 0; }
    .vc-a-price-block { margin: 8px 0 6px; }
    .vc-a-price-per { display: flex; align-items: flex-end; justify-content: center; gap: 4px; }
    .vc-a-price-dollar { font-size: 24px; font-weight: 700; color: #0d1b4b; line-height: 1; }
    .vc-a-price-amount { font-size: 51px; font-weight: 900; color: #0d1b4b; line-height: 1; }
    .vc-a-card.vc-a-best .vc-a-price-dollar { font-size: 31px; color: #e8c84a; }
    .vc-a-card.vc-a-best .vc-a-price-amount { font-size: 67px; color: #e8c84a; }
    .vc-a-price-unit { font-size: 11px; color: #888; font-weight: 600; text-transform: uppercase; line-height: 1.3; text-align: left; }
    @keyframes vc-a-ripple {
      0%   { transform: scale(0); opacity: 0.55; }
      80%  { transform: scale(2.8); opacity: 0.12; }
      100% { transform: scale(3.2); opacity: 0; }
    }
    .vc-a-ripple-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.70);
      pointer-events: none;
      animation: vc-a-ripple 0.52s ease-out forwards;
      transform-origin: center;
    }
    .vc-btn-spinner { display: inline-block; width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: vc-btn-spin 0.65s linear infinite; vertical-align: middle; }
    @keyframes vc-btn-spin { to { transform: rotate(360deg); } }
    .vc-a-savings-row { display: flex; justify-content: center; align-items: center; gap: 8px; margin: 8px 0; flex-wrap: wrap; }
    .vc-a-pill-save { background: linear-gradient(90deg, #c9a227, #a07a10); color: #fff; font-size: 12px; font-weight: 800; padding: 5px 14px; border-radius: 20px; white-space: nowrap; }
    .vc-a-pill-discount { background: linear-gradient(90deg, #16a34a, #15803d); color: #fff; font-size: 12px; font-weight: 800; padding: 5px 14px; border-radius: 20px; white-space: nowrap; }
    .vc-a-guarantee-text { font-size: 10px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
    @keyframes vc-a-btn-breathe {
      0%, 100% { box-shadow: 0 4px 14px rgba(201,162,39,0.35), 0 0 0 0 rgba(201,162,39,0); }
      50%       { box-shadow: 0 4px 20px rgba(201,162,39,0.55), 0 0 0 5px rgba(201,162,39,0.08); }
    }
    @keyframes vc-a-btn-best-breathe {
      0%, 100% { box-shadow: 0 4px 16px rgba(201,162,39,0.40), 0 0 0 0 rgba(201,162,39,0); }
      50%       { box-shadow: 0 4px 22px rgba(201,162,39,0.65), 0 0 0 5px rgba(201,162,39,0.12); }
    }
    .vc-a-btn {
      display: block;
      width: 100%;
      padding: 17px 10px;
      border-radius: 12px;
      font-size: 19px;
      font-weight: 900;
      text-align: center;
      text-decoration: none;
      color: #fff;
      background: linear-gradient(135deg, #e8c84a 0%, #c9a227 40%, #a07a10 100%);
      border: none;
      cursor: pointer;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      text-shadow: 0 1px 3px rgba(0,0,0,0.35);
      transition: transform 0.15s cubic-bezier(.34,1.56,.64,1), box-shadow 0.15s ease, filter 0.15s ease;
      box-shadow: 0 4px 14px rgba(201,162,39,0.45), 0 1px 0 rgba(255,255,255,0.18) inset;
      margin-bottom: 4px;
      position: relative;
      overflow: hidden;
      animation: vc-a-btn-breathe 2.8s ease-in-out infinite;
    }
    .vc-a-btn:hover {
      transform: translateY(-3px) scale(1.025);
      filter: brightness(1.10) saturate(1.12);
      box-shadow: 0 10px 28px rgba(201,162,39,0.65), 0 2px 8px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.20) inset;
      text-decoration: none;
      color: #fff;
      animation: none;
    }
    .vc-a-btn:active { transform: translateY(1px) scale(0.98); filter: brightness(0.96); }
    .vc-a-btn.vc-a-btn-best {
      background: linear-gradient(135deg, #e8c84a 0%, #c9a227 45%, #8a6510 100%);
      box-shadow: 0 4px 16px rgba(201,162,39,0.50), 0 1px 0 rgba(255,255,255,0.15) inset;
      animation: vc-a-btn-best-breathe 2.4s ease-in-out infinite;
      color: #fff;
    }
    .vc-a-btn.vc-a-btn-best:hover {
      filter: brightness(1.10) saturate(1.12);
      box-shadow: 0 10px 30px rgba(201,162,39,0.70), 0 2px 8px rgba(0,0,0,0.14);
      animation: none;
    }
    .vc-a-btn-wrap { width: 100%; padding: 0 16px; box-sizing: border-box; }
    .vc-a-btn-aux { font-size: 11px; font-weight: 600; opacity: 0.85; }
    .vc-a-payment-icons { display: flex; justify-content: center; align-items: center; gap: 5px; margin-top: 10px; flex-wrap: wrap; }
    .vc-a-total-row { margin-top: 10px; font-size: 13px; color: #555; display: flex; align-items: baseline; justify-content: center; gap: 4px; flex-wrap: wrap; }
    .vc-a-total-label { font-weight: 700; color: #555; font-size: 13px; }
    .vc-a-total-full { text-decoration: line-through; color: #aaa; }
    .vc-a-total-now { font-weight: 900; color: #0d1b4b; font-size: 18px; }
    .vc-a-shipping { font-size: 11px; font-weight: 700; margin-top: 2px; }
    .vc-a-shipping.free { color: #16a34a; }
    .vc-a-shipping.paid { color: #dc2626; }
    @keyframes vc-a-fadeup { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    .vc-a-card:not(.vc-a-best) { animation: vc-a-fadeup 0.5s ease both; }
    .vc-a-card:nth-child(1) { animation-delay: 0.05s; }
    .vc-a-card:nth-child(3) { animation-delay: 0.25s; }
    @keyframes vc-a-fadeup-best { from { opacity: 0; transform: translateY(24px) scale(1.06); } to { opacity: 1; transform: translateY(0) scale(1.06); } }
    @keyframes vc-a-pulse {
      0%   { box-shadow: 0 12px 40px rgba(201,162,39,0.25), 0 4px 16px rgba(0,0,0,0.08); }
      50%  { box-shadow: 0 16px 50px rgba(201,162,39,0.42), 0 4px 16px rgba(0,0,0,0.08); }
      100% { box-shadow: 0 12px 40px rgba(201,162,39,0.25), 0 4px 16px rgba(0,0,0,0.08); }
    }
    .vc-a-card.vc-a-best { animation: vc-a-fadeup-best 0.5s 0.15s ease both, vc-a-pulse 3s 0.7s ease-in-out infinite; }
    @media (max-width: 1023px) {
      .vc-a-bump-wrapper { padding: 28px 12px 24px; }
      .vc-a-card { max-width: 420px; width: 92%; padding: 20px 16px 18px; margin-bottom: 0; min-width: 0; }
      .vc-a-card.vc-a-best { transform: scale(1); max-width: 420px; width: 92%; padding: 22px 18px 20px; min-width: 0; }
      .vc-a-card.vc-a-best:hover { transform: translateY(-6px) scale(1.02); }
      .vc-a-card-headline { font-size: 17px; }
      .vc-a-card-desc { font-size: 12px; }
      .vc-a-price-amount { font-size: 40px; }
      .vc-a-price-dollar { font-size: 19px; }
      .vc-a-card.vc-a-best .vc-a-price-amount { font-size: 53px; }
      .vc-a-card.vc-a-best .vc-a-price-dollar { font-size: 25px; }
      .vc-a-btn { padding: 13px 10px; font-size: 16px; }
      .vc-a-img-wrap { min-height: 150px; }
      .vc-a-img-wrap img { max-height: 182px; }
    }
  `;

  // ── Style injection ──────────────────────────────────────────────────────
  function injectStylesA() {
    if ( document.getElementById( 'vc-a-bump-styles' ) ) return;
    var s = document.createElement( 'style' );
    s.id = 'vc-a-bump-styles';
    s.textContent = CSS_A;
    document.head.appendChild( s );
  }

  // ── Shared offer config reader ───────────────────────────────────────────
  function readOffers( container, offerClass ) {
    var DEFAULT_DESKTOP = { promo: 1, basic: 2, mid: 3 };
    var DEFAULT_MOBILE = { promo: 1, mid: 2, basic: 3 };
    var els = container.querySelectorAll( '.' + offerClass );
    if ( els.length === 0 ) els = [ container ];
    return Array.prototype.slice.call( els ).map( function ( el, i ) {
      var offerType = getAttr( el, 'offer', 'basic' );
      return {
        href: el.getAttribute( 'data-vc-original-href' ) || el.getAttribute( 'data-href' ) || el.getAttribute( 'href' ) || '#',
        offer: offerType,
        headline: getAttr( el, 'headline', 'Package' ),
        description: getAttr( el, 'description', '' ),
        bottles: parseInt( getAttr( el, 'bottles', '1' ), 10 ),
        guarantee: getAttr( el, 'guarantee', '30' ),
        total: parseFloat( getAttr( el, 'total', '0' ) ),
        full: parseFloat( getAttr( el, 'full', '0' ) ),
        shipping: getAttr( el, 'shipping', 'Free' ),
        valueRound: getAttr( el, 'value-round', 'no' ),
        buttonText: getAttr( el, 'button-text', 'BUY NOW' ),
        aux: getAttr( el, 'aux', '' ),
        buttonClass: getAttr( el, 'button-class', '' ),
        mobileOrder: el.hasAttribute( 'data-order' )
          ? parseInt( el.getAttribute( 'data-order' ), 10 )
          : ( DEFAULT_MOBILE[ offerType ] || i + 1 ),
        desktopOrder: el.hasAttribute( 'data-desktop-order' )
          ? parseInt( el.getAttribute( 'data-desktop-order' ), 10 )
          : ( DEFAULT_DESKTOP[ offerType ] || i + 1 ),
      };
    } );
  }

  // ── Variant A renderer ───────────────────────────────────────────────────
  function buildCardA( cfg, container ) {
    var isBest = cfg.offer === 'promo';
    var imgSrc = IMAGES[ String( cfg.bottles ) ] || '';
    var shippingFree = ( cfg.shipping === 'Free' || cfg.shipping === '0' || cfg.shipping === '' );
    var perBottle = cfg.valueRound === 'yes' ? Math.round( cfg.total / cfg.bottles ) : ( cfg.total / cfg.bottles ).toFixed( 2 );
    var savings = cfg.full - cfg.total;
    var cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 576 512" style="display:inline-block;vertical-align:middle;margin-right:8px;margin-bottom:2px" fill="currentColor"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';

    var card = document.createElement( 'a' );
    card.setAttribute( 'data-vc-href', cfg.href );
    if ( cfg.href && cfg.href !== '#' ) card.href = cfg.href;
    card.className = 'vc-a-card smartplayer-click-event' + ( isBest ? ' vc-a-best' : '' );
    card.setAttribute( 'role', 'link' );
    card.setAttribute( 'data-version', VERSION );
    card.style.cursor = 'pointer';

    var inner = '';
    if ( isBest ) inner += '<span class="vc-a-badge-top">' + ( cfg.headline || 'Best Value!' ) + '</span>';
    inner += '<div class="vc-a-card-header"><div class="vc-a-card-headline">' + cfg.headline + '</div><div class="vc-a-card-desc">' + cfg.description + '</div></div>';
    inner += '<div class="vc-a-img-wrap">';
    if ( imgSrc ) inner += '<img src="' + imgSrc + '" alt="' + cfg.bottles + ' bottles" loading="lazy" />';
    inner += '<div class="vc-a-guarantee-badge">' + BADGE_SVG + '</div>';
    inner += '</div>';
    inner += '<div class="vc-a-price-block"><div class="vc-a-price-per"><span class="vc-a-price-dollar">$</span><span class="vc-a-price-amount">' + perBottle + '</span><span class="vc-a-price-unit">Per<br>Bottle</span></div></div>';
    inner += '<div class="vc-a-savings-row"><span class="vc-a-pill-save">YOU SAVE $' + savings + '</span>';
    if ( isBest ) inner += '<span class="vc-a-pill-discount">BIGGEST DISCOUNT</span>';
    inner += '</div>';
    inner += '<div class="vc-a-guarantee-text">' + cfg.guarantee + ' DAYS GUARANTEE</div>';
    var extraBtnClass = cfg.buttonClass ? ' ' + cfg.buttonClass : '';
    var btnClass = 'vc-a-btn' + ( isBest ? ' vc-a-btn-best' : '' ) + ' smartplayer-click-event' + extraBtnClass;
    inner += '<div class="vc-a-btn-wrap"><span class="' + btnClass + '" data-version="' + VERSION + '">' + cartIcon + ( cfg.buttonText || 'BUY NOW' );
    if ( isBest && cfg.aux ) inner += '<br><small class="vc-a-btn-aux">' + cfg.aux + '</small>';
    inner += '</span></div>';
    inner += '<div class="vc-a-payment-icons">' + paymentIconsHTML( 'sm' ) + '</div>';
    inner += '<div class="vc-a-total-row"><span class="vc-a-total-label">TOTAL:</span><span class="vc-a-total-full">$' + cfg.full + '</span><span class="vc-a-total-now">$' + cfg.total + '</span></div>';
    inner += '<div class="vc-a-shipping ' + ( shippingFree ? 'free' : 'paid' ) + '">' + ( shippingFree ? '+ FREE SHIPPING' : '+ $' + cfg.shipping + ' SHIPPING' ) + '</div>';
    card.innerHTML = inner;

    var _cardActivating = false;
    function handleCardActivation( e ) {
      if ( _cardActivating ) return;
      _cardActivating = true;
      e.preventDefault();
      trackEvent( container, 'click', cfg.offer );
      var btn = card.querySelector( '.vc-a-btn' );
      if ( btn ) {
        var rect = btn.getBoundingClientRect();
        var size = Math.max( rect.width, rect.height ) * 1.2;
        var circle = document.createElement( 'span' );
        circle.className = 'vc-a-ripple-circle';
        var cx = e.clientX != null ? e.clientX : rect.left + rect.width / 2;
        var cy = e.clientY != null ? e.clientY : rect.top + rect.height / 2;
        circle.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + ( cx - rect.left - size / 2 ) + 'px;top:' + ( cy - rect.top - size / 2 ) + 'px;';
        btn.appendChild( circle );
        circle.addEventListener( 'animationend', function () { circle.remove(); } );
        var origHTML = btn.innerHTML;
        btn.innerHTML = '<span class="vc-btn-spinner"></span>';
        btn.style.opacity = '0.85';
        btn.style.pointerEvents = 'none';
        setTimeout( function () {
          btn.innerHTML = origHTML;
          btn.style.opacity = '';
          btn.style.pointerEvents = '';
          _cardActivating = false;
        }, 3000 );
      }
      var dest = ( card.href && card.href !== window.location.href ) ? card.href : ( card.getAttribute( 'data-vc-href' ) || cfg.href );
      if ( dest && dest !== '#' ) setTimeout( function () { window.location.href = dest; }, 250 );
    }
    card.addEventListener( 'click', handleCardActivation );
    card.addEventListener( 'keydown', function ( e ) {
      if ( e.key === 'Enter' || e.key === ' ' ) handleCardActivation( e );
    } );
    return card;
  }

  function renderA( container ) {
    injectStylesA();
    var title = container.hasAttribute( 'data-title' ) ? container.getAttribute( 'data-title' ) : '';
    var subtitle = container.hasAttribute( 'data-subtitle' ) ? container.getAttribute( 'data-subtitle' ) : '';
    var wrapper = document.createElement( 'div' );
    wrapper.className = 'vc-a-bump-wrapper';
    var headerHTML = '';
    if ( title ) headerHTML += '<div class="vc-a-bump-title">' + title + '</div>';
    if ( subtitle ) headerHTML += '<div class="vc-a-bump-subtitle">' + subtitle + '</div>';
    wrapper.innerHTML = headerHTML;
    var grid = document.createElement( 'div' );
    grid.className = 'vc-a-bump-grid';
    var offerClass = container.querySelectorAll( '.vc-a-offer' ).length > 0 ? 'vc-a-offer' : 'vc-offer';
    var offers = readOffers( container, offerClass );
    offers.forEach( function ( cfg ) {
      var card = buildCardA( cfg, container );
      card.style.setProperty( '--vc-order-mobile', String( cfg.mobileOrder ) );
      card.style.setProperty( '--vc-order-desktop', String( cfg.desktopOrder ) );
      grid.appendChild( card );
    } );
    wrapper.appendChild( grid );
    container.innerHTML = '';
    container.appendChild( wrapper );
    container.dispatchEvent( new CustomEvent( 'vc:rendered', { bubbles: true, detail: { variant: 'A', version: VERSION } } ) );
  }

  // ── A/B Tracking ────────────────────────────────────────────────────────
  function getSessionId() {
    var id = sessionStorage.getItem( 'vc_session_id' );
    if ( !id ) {
      id = Math.random().toString( 36 ).slice( 2 ) + Date.now().toString( 36 );
      sessionStorage.setItem( 'vc_session_id', id );
    }
    return id;
  }
  function trackEvent( container, eventType, offerType ) {
    var trackUrl = container.getAttribute( 'data-track-url' );
    var widgetId = container.getAttribute( 'data-widget-id' ) || 'default';
    var variant = container.getAttribute( 'data-vc-variant' ) || 'A';
    if ( !trackUrl ) return;
    var payload = JSON.stringify( {
      widgetId: widgetId,
      variant: variant,
      event: eventType,
      offerType: offerType || null,
      sessionId: getSessionId(),
      ts: Date.now()
    } );
    if ( eventType === 'click' && typeof navigator !== 'undefined' && navigator.sendBeacon ) {
      try {
        navigator.sendBeacon( trackUrl, new Blob( [ payload ], { type: 'application/json' } ) );
        return;
      } catch ( e ) { }
    }
    try {
      fetch( trackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      } );
    } catch ( e ) { }
  }

  // ── Main render dispatcher — always Variant A ────────────────────────────
  function render( container ) {
    container.setAttribute( 'data-vc-variant', 'A' );
    renderA( container );
    setTimeout( function () { trackEvent( container, 'impression', null ); }, 200 );
    container.addEventListener( 'click', function ( e ) {
      var card = e.target.closest( '[data-vc-href]' );
      if ( card ) {
        var offerType = card.getAttribute( 'data-offer' ) || null;
        trackEvent( container, 'click', offerType );
        return;
      }
      var link = e.target.closest( '.vc-offer, .vc-a-offer, .vc-a-btn' );
      if ( !link ) return;
      var offerType = link.getAttribute( 'data-offer' ) || null;
      trackEvent( container, 'click', offerType );
    } );
  }

  // ── Preserve original hrefs before platform scripts mutate them ──────────
  function snapshotHrefs() {
    var sel = '.vc-bump, .vc-a-bump';
    document.querySelectorAll( sel ).forEach( function ( container ) {
      container.querySelectorAll( '.vc-offer, .vc-a-offer' ).forEach( function ( el ) {
        if ( !el.hasAttribute( 'data-vc-original-href' ) ) {
          var raw = el.getAttribute( 'href' ) || el.getAttribute( 'data-href' ) || '';
          if ( raw && raw.indexOf( 'javascript:' ) !== 0 ) {
            el.setAttribute( 'data-vc-original-href', raw );
          }
        }
      } );
    } );
  }

  snapshotHrefs();

  if ( typeof MutationObserver !== 'undefined' ) {
    var _mo = new MutationObserver( function () { snapshotHrefs(); } );
    _mo.observe( document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: [ 'href' ] } );
  }

  // ── Auto-init ────────────────────────────────────────────────────────────
  function init() {
    document.querySelectorAll( '.vc-bump, .vc-a-bump' ).forEach( render );
  }

  if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', init );
  } else {
    init();
  }

  global.NeurotydeBump = { render: render, renderA: renderA, init: init, version: VERSION };

}( window ) );
