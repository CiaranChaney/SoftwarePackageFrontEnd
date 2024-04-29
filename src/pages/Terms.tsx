import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Favicon from "../components/Favicon";

const Terms = () => {

    return (
        <div>
            <Favicon />
            <NavBar />

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">

                        <h1 className="mt-5">Website Terms and Conditions of Use</h1>

                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using this website (hereinafter referred to as "the Website"), you
                            acknowledge and agree to comply with these Terms and Conditions of Use. If you do not agree
                            to all the terms and conditions stated herein, you must not access or use the Website. These
                            terms constitute a legally binding agreement between you and Hash Veritas.</p>

                        <h2>2. Use License</h2>
                        <p>Permission is hereby granted to access and temporarily download one copy of the materials
                            (information or software) on Hash Veritas's Website for personal, non-commercial transitory
                            viewing only. This is the grant of a license, not a transfer of title, and under this
                            license you may not:</p>
                        <ul>
                            <li>Modify or copy the materials;</li>
                            <li>Use the materials for any commercial purpose or for any public display;</li>
                            <li>Attempt to reverse engineer any software contained on Hash Veritas's Website;</li>
                            <li>Remove any copyright or other proprietary notations from the materials; or</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other
                                server.
                            </li>
                        </ul>
                        <p>This license shall automatically terminate if you violate any of these restrictions and may
                            be terminated by Hash Veritas at any time. Upon terminating your viewing of these materials
                            or upon the termination of this license, you must destroy any downloaded materials in your
                            possession whether in electronic or printed format.</p>

                        <h2>3. Disclaimer</h2>
                        <p>All materials on Hash Veritas's Website are provided "as is". Hash Veritas makes no
                            warranties, expressed or implied, and hereby disclaims and negates all other warranties,
                            including without limitation, implied warranties or conditions of merchantability, fitness
                            for a particular purpose, or non-infringement of intellectual property or other violation of
                            rights. Further, Hash Veritas does not warrant or make any representations concerning the
                            accuracy, likely results, or reliability of the use of the materials on its Website or
                            otherwise relating to such materials or on any sites linked to this site.</p>

                        <h2>4. Limitations</h2>
                        <p>In no event shall Hash Veritas or its suppliers be liable for any damages (including, without
                            limitation, damages for loss of data or profit, or due to business interruption) arising out
                            of the use or inability to use the materials on Hash Veritas's Website, even if Hash Veritas
                            or a Hash Veritas authorized representative has been notified orally or in writing of the
                            possibility of such damage. Because some jurisdictions do not allow limitations on implied
                            warranties, or limitations of liability for consequential or incidental damages, these
                            limitations may not apply to you.</p>

                        <h2>5. Revisions and Errata</h2>
                        <p>The materials appearing on Hash Veritas's Website could include technical, typographical, or
                            photographic errors. Hash Veritas does not warrant that any of the materials on its Website
                            are accurate, complete, or current. Hash Veritas may make changes to the materials contained
                            on its Website at any time without notice. Hash Veritas does not, however, make any
                            commitment to update the materials.</p>

                        <h2>6. Links</h2>
                        <p>Hash Veritas has not reviewed all of the sites linked to its Website and is not responsible
                            for the contents of any such linked site. The inclusion of any link does not imply
                            endorsement by Hash Veritas of the site. Use of any such linked website is at the user's own
                            risk.</p>

                        <h2>7. Site Terms of Use Modifications</h2>
                        <p>Hash Veritas may revise these terms of use for its Website at any time without notice. By
                            using this Website, you are agreeing to be bound by the then current version of these Terms
                            and Conditions of Use.</p>

                        <h2>8. Your Privacy</h2>
                        <p>Please read our <a href="/privacy">Privacy Policy</a>.</p>

                        <h2>9. Governing Law</h2>
                        <p>Any claim relating to Hash Veritas's Website shall be governed by the laws of Ireland
                            without regard to its conflict of law provisions.</p>


                    </div>
                </div>
            </div>


            <Footer/>

        </div>

    );
};


export default Terms;