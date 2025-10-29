function Heading({head="Spare parts", noUnderline=false}){
    return <h1 style={{
        fontFamily: "'Poppins', 'Segoe UI', Roboto, Arial, sans-serif",
        fontSize: '36px',
        fontWeight: 600,
        color: '#333333',
        textDecoration: noUnderline ? "none" : "underline",
        marginLeft: 50,
        marginBottom: 20,
        position: 'relative',
        paddingBottom: noUnderline ? 0 : 8
    }}>{head}</h1>
}
export default Heading;
