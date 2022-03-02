

function Shape (props) {
    const radius = props.radius;
    const width = props.width;
    const height = props.height; 
    return <div className={{width: width, height: height, radius: radius}}>{props.children}</div>


}

export default Shape;