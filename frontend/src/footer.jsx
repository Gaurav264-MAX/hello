import React, { useEffect, useRef } from 'react';

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class to trigger the animations
            entry.target.classList.add('footer-animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={footerRef} className="footer-container">
      <iframe 
        src="/my-file.html" 
        width="100%" 
        height="600px" 
        title="Embedded HTML"
        style={{ border: "none" }}
      />
    </div>
  );
}

export default Footer;
