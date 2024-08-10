import React from 'react';

const Footer = () => {
  return (
    <div className="footer-container">
      <style>
        {`
          .footer-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #002a38;
            line-height: 1.3;
            font-family: Menlo, monospace;
          }

          .footer-container ul {
            display: inline-grid;
            grid-auto-flow: row;
            grid-gap: 24px;
            justify-items: center;
            margin: auto;
          }

          @media (min-width: 500px) {
            .footer-container ul {
              grid-auto-flow: column;
            }
          }

          .footer-container a {
            color: white;
            text-decoration: none;
            box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.4);
          }

          .footer-container a:hover {
            box-shadow: inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4);
          }

          .footer-container li:last-child {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
          }

          .footer-container li:hover ~ li p {
            animation: wave-animation 0.3s infinite;
          }

          /* Additional styling for the demo */

          @keyframes wave-animation {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(20deg);
            }
            75% {
              transform: rotate(-15deg);
            }
        `}
      </style>


      <ul>
        <li><a href="https://twitter.com">Twitter</a></li>
        <li><a href="https://codepen.io">Codepen</a></li>
        <li><a href="mailto:creacvexpress@gmail.com">Email</a></li>
        <li><a href="https://dribbble.com">Dribbble</a></li>
        <li><a href="https://github.com">Github</a></li>
        <li>
          <p>👋</p>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
