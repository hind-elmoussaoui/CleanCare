import React from "react";

function Maps() {
    return (
        <div className="w-full">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.6978288540604!2d-7.6187849743380776!3d33.5871940421454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d299cc3b941f%3A0x3e7e10cad9ed2f61!2zMTIzINin2YTYrdiz2YYg2KfZhNir2KfZhtmK2Iwg2KfZhNiv2KfYsSDYp9mE2KjZiti22KfYoSAyMDAwMA!5e0!3m2!1sar!2sma!4v1741700048027!5m2!1sar!2sma"
            width="100%"
            height="450"
            style={{ border: "0", borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}

export default Maps;
