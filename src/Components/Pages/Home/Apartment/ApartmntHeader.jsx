
const ApartmntHeader = ({header,title}) => {
    return (
        <div>
            <h2 className="text-5xl mx-auto text-center py-6 font-medium ">{header} </h2>
            <p className="my-3 text-center w-[80%] md:w-[59%] mx-auto">{title}</p>
        </div>
    );
};

export default ApartmntHeader;