
function ArticleCabecera({toggleModal}:any) {
    return (
        <div className="text-black text-2xl mb-4 p-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-between">
            <p className="text-center">Artículos</p>
            <button
                className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-600 font-medium rounded-lg text-sm px-5 py-2.5" onClick={toggleModal}
            >Agregar</button>
        </div>
    );
}

export default ArticleCabecera;