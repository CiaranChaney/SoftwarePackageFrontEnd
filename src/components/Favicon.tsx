import { useEffect } from 'react';

const Favicon = () => {
    useEffect(() => {
        const favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
            const newFavicon = document.createElement("link");
            newFavicon.rel = "icon";
            newFavicon.href = "https://imgur.com/4bSXALG.png";
            newFavicon.id = "favicon";
            document.head.appendChild(newFavicon);
        }
    }, []);


    return null;
}

export default Favicon;
