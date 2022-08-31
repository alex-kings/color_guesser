export default function ColorBox({color}){
    return(
        <div className="text-center" style={{backgroundColor:color}}>
            {color}
        </div>
    )
}