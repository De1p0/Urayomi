export default function Library() {
    // this is for test ONLY remove once library fn is fully implemented

    let library = [{
        name: "The Fragrant Flower Blooms with Dignity",
        // image src will be cached offline until 12hr update
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg/250px-Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "The Fragrant Flower Blooms with Dignity",
        // image src will be cached offline until 12hr update
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg/250px-Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "The Fragrant Flower Blooms with Dignity",
        // image src will be cached offline until 12hr update
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg/250px-Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "The Fragrant Flower Blooms with Dignity",
        // image src will be cached offline until 12hr update
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg/250px-Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "The Fragrant Flower Blooms with Dignity",
        // image src will be cached offline until 12hr update
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg/250px-Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "The Fragrant Flower Blooms with Dignity",
        // image src will be cached offline until 12hr update
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg/250px-Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }, {
        name: "Chainsaw Man",
        imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Chainsawman.jpg/250px-Chainsawman.jpg"
    }]

    return (
        <div className="w-full h-screen flex flex-wrap gap-5 content-start p-5 overflow-y-auto">
            {library.map((book, index) => (
                <div key={index} className="relative aspect-2/3 max-w-50 max-h-70 w-full rounded-2xl overflow-hidden shadow-lg ">
                    <img src={book.imageSrc} className="w-full h-full object-cover" alt={book.name} />
                    <span className="absolute bottom-0 left-0 w-full p-4 text-white font-black bg-linear-to-t from-black/90 to-transparent">
                        {book.name}
                    </span>
                </div>
            ))}
        </div >
    );
}