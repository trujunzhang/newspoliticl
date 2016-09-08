import React from 'react';
import {FormattedMessage} from 'react-intl';

const Footer = props => {
  return (
    <footer id="colofon">
      <section id="footer-bottom">

        <div className="copyright-info">
          <span className="copyright">Copyright © 2016  Politicl.</span>
          <br/>
          <span className="author">
					<p>Made with &lt;3 in India</p>
				</span>
        </div>
      </section>
    </footer>
  )
};

Footer.displayName = "Footer";

module.exports = Footer;