import Link from 'next/link';

import c from './Footer.module.scss'

export default function Footer() {
  return <footer className={c.root}>
    <div className={c.content}>

      <div className={c.logo}>
        <svg width="220" height="65" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M105.025 54.039C102.216 54.1236 99.4196 53.6303 96.8091 52.5897C94.1986 51.5492 91.8296 49.9836 89.849 47.99C87.8785 46.0354 86.3278 43.699 85.2919 41.1241C84.2561 38.5491 83.7569 35.7897 83.825 33.015C83.7573 30.2409 84.2567 27.4821 85.2925 24.9076C86.3284 22.3332 87.8788 19.9973 89.849 18.043C91.8293 16.0486 94.1981 14.4823 96.8086 13.4411C99.4192 12.3999 102.216 11.906 105.025 11.99C108.582 11.9614 112.085 12.8595 115.19 14.596C118.21 16.2473 120.723 18.6901 122.459 21.662L116.667 25.021C115.583 23.01 113.945 21.3518 111.947 20.243C109.836 19.0534 107.449 18.4438 105.026 18.476C103.084 18.3975 101.147 18.7226 99.3372 19.4307C97.5273 20.1388 95.884 21.2145 94.511 22.59C93.1741 23.9683 92.1286 25.6019 91.4371 27.3933C90.7455 29.1846 90.4221 31.0969 90.486 33.016C90.4221 34.9351 90.7455 36.8474 91.4371 38.6388C92.1286 40.4301 93.1741 42.0637 94.511 43.442C95.8842 44.8168 97.5274 45.8919 99.3371 46.5995C101.147 47.3071 103.084 47.6318 105.025 47.553C107.456 47.5831 109.853 46.9741 111.975 45.787C113.977 44.6938 115.61 43.0309 116.666 41.009L122.458 44.309C120.751 47.2906 118.256 49.7452 115.247 51.404C112.13 53.1632 108.604 54.0719 105.025 54.039Z" fill="white"/>
          <path d="M149.437 54.04L140.553 38.722H132.377V54.04H125.469V11.99H142.289C144.07 11.9567 145.839 12.2887 147.487 12.9655C149.135 13.6423 150.626 14.6495 151.87 15.925C153.146 17.1685 154.153 18.6602 154.83 20.3081C155.506 21.9559 155.838 23.7249 155.805 25.506C155.82 28.1402 155.012 30.7133 153.492 32.865C152.007 35.0426 149.904 36.7266 147.455 37.701L157.006 54.04H149.437ZM132.377 18.478V32.535H142.289C143.17 32.5479 144.044 32.3724 144.853 32.0202C145.661 31.6681 146.384 31.1474 146.975 30.493C148.25 29.1506 148.941 27.3578 148.897 25.507C148.941 23.6563 148.25 21.8635 146.975 20.521C146.384 19.8667 145.661 19.346 144.853 18.9938C144.044 18.6417 143.17 18.4662 142.289 18.479L132.377 18.478Z" fill="white"/>
          <path d="M184.459 32.234C186.236 33.1355 187.732 34.5068 188.784 36.199C189.845 37.9544 190.387 39.975 190.346 42.026C190.385 43.6366 190.078 45.2368 189.446 46.7186C188.814 48.2005 187.872 49.5295 186.682 50.616C184.265 52.8891 181.049 54.1191 177.732 54.04H159.71V11.99H176.41C179.648 11.9111 182.787 13.1086 185.15 15.324C186.307 16.374 187.225 17.6602 187.841 19.0956C188.458 20.531 188.759 22.0821 188.724 23.644C188.784 25.3176 188.425 26.9796 187.68 28.4796C186.935 29.9795 185.828 31.27 184.459 32.234ZM176.41 18.478H166.618V29.531H176.41C177.126 29.5461 177.837 29.4123 178.499 29.1383C179.161 28.8643 179.758 28.4559 180.254 27.939C180.766 27.4221 181.168 26.8071 181.437 26.1309C181.705 25.4547 181.834 24.7313 181.816 24.004C181.834 23.2767 181.705 22.5532 181.437 21.877C181.168 21.2008 180.766 20.5858 180.254 20.069C179.758 19.5522 179.161 19.144 178.499 18.8701C177.837 18.5963 177.126 18.4627 176.41 18.478ZM177.732 47.552C178.49 47.5664 179.243 47.4214 179.941 47.1265C180.64 46.8316 181.269 46.3933 181.787 45.84C182.327 45.2892 182.751 44.6362 183.034 43.9193C183.318 43.2023 183.456 42.4359 183.439 41.665C183.456 40.8941 183.318 40.1277 183.034 39.4108C182.751 38.6938 182.327 38.0408 181.787 37.49C181.269 36.9367 180.64 36.4984 179.941 36.2035C179.243 35.9086 178.49 35.7636 177.732 35.778H166.618V47.552H177.732Z" fill="white"/>
          <path d="M219.901 11.99V18.598H208.065V54.04H201.157V18.598H189.265V11.99H219.901Z" fill="white"/>
          <path d="M70.961 64.7H38.617C34.3683 64.7053 30.1605 63.8711 26.2352 62.2453C22.3099 60.6194 18.7446 58.234 15.744 55.226C14.7726 54.2547 13.8631 53.2233 13.021 52.138L24.867 45.3L6.346 34.6C6.295 33.853 6.269 33.1 6.269 32.346C6.26571 28.0972 7.10019 23.8894 8.72469 19.9634C10.3492 16.0374 12.7318 12.4702 15.7363 9.46588C18.7408 6.4616 22.3081 4.07918 26.2342 2.45492C30.1603 0.830665 34.3682 -0.00355078 38.617 -1.57163e-07H38.625C42.874 -0.00355095 47.0821 0.830724 51.0084 2.45509C54.9347 4.07946 58.5022 6.46205 61.5068 9.46653C64.5113 12.471 66.894 16.0384 68.5185 19.9647C70.143 23.8909 70.9774 28.099 70.974 32.348L70.961 64.7ZM48.11 40.637L29.226 41.958L29.287 42.841C29.4488 45.0721 30.4473 47.1597 32.0825 48.6861C33.7177 50.2125 35.8691 51.065 38.106 51.073C38.314 51.073 38.525 51.066 38.732 51.051L39.079 51.027C41.6532 50.8437 44.0497 49.647 45.7427 47.6992C47.4357 45.7514 48.287 43.2117 48.11 40.637ZM52.8 21.785C51.5931 21.7828 50.4126 22.1387 49.408 22.8077C48.4034 23.4766 47.6199 24.4286 47.1565 25.543C46.6931 26.6574 46.5707 27.8843 46.8049 29.0683C47.039 30.2523 47.6191 31.3402 48.4718 32.1944C49.3244 33.0486 50.4113 33.6307 51.5949 33.867C52.7785 34.1032 54.0056 33.9831 55.1208 33.5217C56.2361 33.0603 57.1894 32.2785 57.8602 31.2751C58.531 30.2717 58.889 29.0919 58.889 27.885C58.889 26.2691 58.2478 24.7192 57.1062 23.5755C55.9646 22.4319 54.4159 21.7879 52.8 21.785ZM25.2 21.785C23.993 21.7826 22.8125 22.1384 21.8078 22.8072C20.803 23.476 20.0193 24.4279 19.5558 25.5423C19.0923 26.6567 18.9697 27.8836 19.2038 29.0677C19.4378 30.2518 20.0178 31.3398 20.8704 32.1941C21.723 33.0484 22.8099 33.6306 23.9935 33.8669C25.1771 34.1032 26.4043 33.9831 27.5196 33.5218C28.6349 33.0605 29.5883 32.2786 30.2591 31.2752C30.9299 30.2718 31.288 29.092 31.288 27.885C31.288 26.2679 30.6459 24.7169 29.5028 23.5731C28.3597 22.4292 26.8091 21.7861 25.192 21.785H25.2ZM0 59.652V30.938L6.346 34.6C6.78301 40.977 9.10648 47.08 13.021 52.133L0 59.652Z" fill="white"/>
        </svg>
      </div>
      
      <div className={c.copyright}>
        ©️ 2021 Clembs <br />
        All rights reserved <br />
        Website by <a href="https://davecode.me">dave caruso</a>
      </div>

      <div className={c.links}>
        <section>
          <div>Explore</div>
          <ul>
            {/* <li><Link href='/blog'>Blog</Link></li> */}
            {/* <li><Link href='/partners'>Partners</Link></li> */}
            <li><Link href='/branding'>Branding</Link></li>
            <li><Link href='/credits'>Credits</Link></li>
            <li><Link href='/changelog'>Changelog</Link></li>
          </ul>
        </section>
        <section>
          <div>Developers</div>
          <ul>
            <li><Link href='/github'>GitHub</Link></li>
            <li><Link href='https://api.clembs.xyz'>Clembs API</Link></li>
            <li><Link href='https://script.crbt.ga'>CRBTScript</Link></li>
          </ul>
        </section>
        <section>
          <div>Legal</div>
          <ul>
            <li><Link href='/policy'>Privacy Policy</Link></li>
          </ul>
        </section>
        <section>
          <div>Contact</div>
          <ul>
            <li><Link href='/discord'>Discord</Link></li>
            <li><Link href='mailto:clembs@clembs.xyz'>Email</Link></li>
          </ul>
        </section>
      </div>
    </div>
  </footer>;
}