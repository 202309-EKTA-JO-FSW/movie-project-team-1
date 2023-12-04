import Link from "next/link";

function Footer(){
    return(
        <>  <div>
                <div><b>Home</b></div>
                <div><Link href="/"><u>Home Page</u></Link></div>
            </div>
            <div>
                <div><b>Movies</b></div>
                <Link href={`/movies?MovieCategory=now_playing`}><u>Now playing Movies</u></Link>
                <br />
                <Link href={`/movies?MovieCategory=top_rated`}><u>Top Rated Movies</u></Link>
                <br />
                <Link href={`/movies?MovieCategory=upcoming`}><u>Upcoming Movies</u></Link>
                <br />
                <Link href={`/movies?MovieCategory=popular`}><u>Popular Movies</u></Link>
            </div>
            <div>
                <div><b>Actors</b></div>
                <Link href={`/actors`}><u>Actors Page</u></Link>
            </div>
            <div>
                <div><b>This Website is developed by:</b></div>
                <div>
                    <p>Sara Jouma</p>
                    <Link href="https://www.linkedin.com/in/sara-jouma-156633127/"><u>Linkedin</u></Link>
                    <br />
                    <Link href="https://github.com/sarajouma"><u>Github</u></Link>
                </div>
                <div>
                    <p>Dana Omar</p>
                    <Link href="https://www.linkedin.com/in/dana-omar-ko/"><u>Linkedin</u></Link>
                    <br />
                    <Link href="https://github.com/Dana-MO"><u>Github</u></Link>
                </div>
                <div>
                    <p>Abdullah Alawad</p>
                    <Link href="https://www.linkedin.com/in/abdullah-alawad-0989b7269/"><u>Linkedin</u></Link>
                    <br />
                    <Link href="https://github.com/Abdullah-Alawad"><u>Github</u></Link>
                </div>
                <div>
                    <p>Mohammad Elamaireh</p>
                    <Link href="https://www.linkedin.com/"><u>Linkedin</u></Link>
                    <br />
                    <Link href="https://github.com/"><u>Github</u></Link>
                </div>
            </div>

        </>
    );
}

export default Footer;