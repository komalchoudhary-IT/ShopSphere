export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section brand">
                    <h3>ShopSphere</h3>
                    <p>Your premium one-stop destination for seamless e-commerce.</p>
                </div>
                
                <div className="footer-section contact">
                    <h4>Contact Us</h4>
                    <p><strong>Email:</strong> support@shopsphere.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                </div>
                
                <div className="footer-section address">
                    <h4>Our Headquarters</h4>
                    <p>123 Tech Park, Phase 2,</p>
                    <p>Electronic City, Bangalore,</p>
                    <p>Karnataka - 560100</p>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
            </div>
        </footer>
    );
}