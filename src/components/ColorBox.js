export default function ColorBox({color, text}){
    // Returns if the text displayed on a colored background should be white or black
    function textLight(color){
        let r = parseInt(color.substring(1,3),16)
        let g = parseInt(color.substring(3,5),16)
        let b = parseInt(color.substring(5,7),16)
        console.log(r,g,b)
        return ((r+g+b) > 382)
    }

    return(
        
        <div className="text-center text-white px-1" style={{backgroundColor:color}}>
            <div className={textLight(color)? 'text-dark':'text-white'}>{text}{color}</div>
        </div>
        
    )
}