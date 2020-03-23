const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const server = express();

const artistsController = require("./controllers/artists-controller");
const exhibitionsController = require("./controllers/exhibitions-controller");
const carouselPicturesController = require("./controllers/carousel-pictures-controllers");
const eventsController = require("./controllers/events-controller");
const adminsController = require("./controllers/admins-controller");
const infoController = require("./controllers/info-controller");
const subController = require("./controllers/subscribes-controller");
const publicationsController = require('./controllers/publications-controller');

const artistsLogic = require("./bll/artists-logic");
const infoLogic = require("./bll/info-logic");
const carouselLogic = require("./bll/carousel-pictures-logic");
const eventsLogic = require("./bll/events-logic");
const exhibitionsLogic = require("./bll/exhibitions-logic");
const publicationsLogic = require("./bll/publications-logic");

server.use(cors());
server.use(express.json());
server.use("/api/artists", artistsController);
server.use("/api/exhibitions", exhibitionsController);
server.use("/api/carousel", carouselPicturesController);
server.use("/api/events", eventsController);
server.use("/api/admins", adminsController);
server.use("/api/info", infoController);
server.use("/api/subscription", subController);
server.use("/api/publications", publicationsController);
server.use(express.static(__dirname));

// artists
const artistStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\assets\\artists`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let artistUpload = multer({ storage: artistStorage });

server.post('/add-artist', artistUpload.array('images', 3), (req, res) => {
    const artist = JSON.parse(req.body.artist);
    for (let i = 0; i < req.files.length; i++) {
        if (req.files[i]) {
            const multerFileName = req.files[i].destination + "\\" + req.files[i].filename;
            const finalFileName = multerFileName;

            fs.rename(multerFileName, finalFileName, err => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (i > 1) res.send("Done");
            });
        }
    }

    artist.mainImageName = {
        fileName: req.files[0].originalname,
        artWork: '',
        material: '',
        size: ''
    };
    artist.imageProps = [
        {
            fileName: req.files[1].originalname,
            artWork: '',
            material: '',
            size: ''
        }
    ];
    artist.croppedPicture = {
        filename: req.files[2].originalname,
        alt: ''
    };

    try {
        artistsLogic.addOneArtist(artist);
    }
    catch (err) {
        console.log(err);
    }
});
server.post("/upload-image", artistUpload.single("myImage"), (request, response) => {
    let id = request.body.artistID;
    let newObj = JSON.parse(request.body.imageForm);

    const multerFileName = request.file.destination + "\\" + request.file.filename;
    const finalFileName = multerFileName;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            response.status(500).json(err);
            return;
        }
        response.send("Done");
    });
    try {

        let artist;
        artistsLogic.getOneArtist(id).then(artists => {
            artist = artists;
            newObj.fileName = request.file.originalname;
            artist.imageProps.push(newObj);
            let obj = {
                mainImageName: artist.mainImageName,
                imageProps: artist.imageProps,
                _id: id,

            }
            artistsLogic.updateArtist(obj);

        });
    }
    catch (err) {
        console.log(err);
    }
});
server.patch("/update-image", artistUpload.single("myImage"), (req, res) => {
    let image = JSON.parse(req.body.updatedImage);
    const lastImage = image.fileName;
    image.fileName = req.file.originalname;

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        let artist;
        artistsLogic.getOneArtist(req.body.id).then(artists => {
            artist = artists;
            artist.mainImageName = image;
            let obj = {
                imageProps: artist.imageProps,
                mainImageName: artist.mainImageName,
                _id: req.body.id
            }
            artistsLogic.updateArtist(obj);

        });

        fs.unlinkSync(`${__dirname}\\assets\\artists\\${lastImage}`);

    }
    catch (err) {
        console.log(err);
    }
});
server.patch("/update-artist-cropped-image", artistUpload.single("image"), (req, res) => {

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    const artist = JSON.parse(req.body.artist);
    const alt = req.body.alt;
    const lastImage = artist.croppedPicture.filename;

    artist.croppedPicture = {
        filename: req.file.originalname,
        alt: alt
    };

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        artistsLogic.updateArtist({ _id: artist._id, croppedPicture: artist.croppedPicture });
        fs.unlinkSync(`${__dirname}\\assets\\artists\\${lastImage}`);
    }
    catch (err) {
        console.log(err);
    }
});

// resume
const cvStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\src\\assets\\artists-cv`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let cvUpload = multer({ storage: cvStorage });

server.post('/add-resume-artist', cvUpload.single('pdf'), (req, res) => {
    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
});
server.patch('/update-resume-artist', cvUpload.single('pdf'), (req, res) => {
    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    const lastImage = req.body.lastImage;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        fs.unlinkSync(`${__dirname}\\src\\assets\\artists-cv\\${lastImage}`);
    }
    catch (err) {
        console.log(err);
    }
});
server.delete('/delete-resume-artist/:cv', (req, res) => {
    const pdf = req.params.cv;
    fs.unlinkSync(`${__dirname}\\src\\assets\\artists-cv\\${pdf}`);
});

// info
const carouselInfo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\assets\\info`);
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
let infoUpload = multer({ storage: carouselInfo });
server.patch("/update-info-image", infoUpload.single('infoImg'), (req, res) => {

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    let image = JSON.parse(req.body.updatedImage);
    const lastImage = image.img;
    image.img = req.file.originalname;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        infoLogic.updateInfo(image);

        fs.unlinkSync(`${__dirname}\\assets\\info\\${lastImage}`);
    }
    catch (err) {
        console.log(err);
    }
});

// carousel
const carouselStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\assets\\carousel`);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
let newUpload = multer({ storage: carouselStorage });
server.patch("/update-carousel-image", newUpload.single('carouselImg'), (req, res) => {
    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    let carousel = JSON.parse(req.body.carousel);
    const lastImage = carousel.imageName;
    carousel.imageName = req.file.originalname;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        carouselLogic.updateCarouselImage(carousel);

        fs.unlinkSync(`${__dirname}\\assets\\${lastImage}`);
    }
    catch (err) {
        console.log(err);
    }
});
server.post('/add-carousel-image', newUpload.single('carouselImg'), (req, res) => {

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    let carousel = JSON.parse(req.body.carousel);
    carousel.imageName = req.file.originalname;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        carouselLogic.addCarouselPicture(carousel);
    }
    catch (err) {
        console.log(err);
    }
});

// events
const eventStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\assets\\events`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let eventUpload = multer({ storage: eventStorage });
server.patch("/update-event-image", eventUpload.single('eventImg'), (req, res) => {
    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    let event = JSON.parse(req.body.event);
    const lastImage = event.fileName;
    event.fileName = req.file.originalname;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        eventsLogic.updateEvent(event);

        fs.unlinkSync(`${__dirname}\\assets\\events\\${lastImage}`);
    }
    catch (err) {
        console.log(err);
    }
});
server.post("/add-event-image", eventUpload.single('eventImg'), (req, res) => {

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    let event = JSON.parse(req.body.event);
    event.fileName = req.file.originalname;
    event.eventImages = [];

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        eventsLogic.addEvent(event);
    }
    catch (err) {
        console.log(err);
    }
});
server.patch('/add-event-image-to-array', eventUpload.single('image'), (req, res) => {
    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    const event = JSON.parse(req.body.event);
    const newImage = JSON.parse(req.body.newImage);

    newImage.fileName = req.file.originalname;
    event.eventImages.push(newImage);

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        eventsLogic.updateEvent(event);
    }
    catch (err) {
        console.log(err);
    }
});

// exhibitions
const exhibitionStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\assets\\exhibitions`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let exhibitionUpload = multer({ storage: exhibitionStorage });
server.post("/add-exhibition-image", exhibitionUpload.array('exhibitionImg', 3), (req, res) => {
    for (let i = 0; i < 3; i++) {
        const multerFileName = req.files[i].destination + "\\" + req.files[i].filename;
        const finalFileName = multerFileName;

        fs.rename(multerFileName, finalFileName, err => {
            if (err) {
                console.log(err);
                return;
            }
            if (i > 1) res.send("Done");
        });
    }

    let exhibition = JSON.parse(req.body.exhibition);
    exhibition.imgSrc = req.files[0].originalname;
    exhibition.imgCover = req.files[1].originalname;
    exhibition.exhibitionImages = [];
    exhibition.exhibitionDetailsImageCover = { fileName: req.files[2].originalname, alt: '' };

    try {
        exhibitionsLogic.addExhibition(exhibition);
    }
    catch (err) {
        console.log(err);
    }
});
server.patch("/add-new-exhibition-image", exhibitionUpload.single('image'), (req, res) => {

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    const exhibition = JSON.parse(req.body.exhibition);
    const imageForm = JSON.parse(req.body.imageForm);

    imageForm.fileName = req.file.originalname;
    exhibition.exhibitionImages.push(imageForm);

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        exhibitionsLogic.updateExhibition(exhibition);
    }
    catch (err) {
        console.log(err);
    }
});
server.patch("/updte-exhibition-cover", exhibitionUpload.single('image'), (req, res) => {

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    const exhibition = JSON.parse(req.body.exhibition);
    const imageForm = JSON.parse(req.body.imageForm);

    imageForm.fileName = req.file.originalname
    exhibition.exhibitionDetailsImageCover = imageForm;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        exhibitionsLogic.updateExhibition(exhibition);
    }
    catch (err) {
        console.log(err);
    }
});

// publications
const publicationStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\assets\\publications`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let publicationUpload = multer({ storage: publicationStorage });
server.patch("/update-publication-file", publicationUpload.array("myAddedFile", 2), (req, res) => {

    const publication = JSON.parse(req.body.publication);

    if (req.files[0]) {
        const multerFileName = req.files[0].destination + "\\" + req.files[0].filename;
        const finalFileName = multerFileName;
        fs.rename(multerFileName, finalFileName, err => {
            if (err) {
                console.log(err);
                return;
            }
        });
        if (req.files[0].mimetype === 'video/mp4') publication.video = req.files[1].originalname;
        else publication.mainImageName = req.files[0].originalname;
    }
    if (req.files[1]) {
        const multerFileName = req.files[1].destination + "\\" + req.files[1].filename;
        const finalFileName = multerFileName;
        fs.rename(multerFileName, finalFileName, err => {
            if (err) {
                console.log(err);
                return;
            }
        });
        if (req.files[0].mimetype === 'video/mp4') publication.video = req.files[1].originalname;
        else publication.mainImageName = req.files[0].originalname;
    }
    res.send("Done");

    try {
        publicationsLogic.patchPublication(publication);
    }
    catch (err) {
        console.log(err);
    }
});
server.patch('/add-publication-image', publicationUpload.single('image'), (req, res) => {

    const publication = JSON.parse(req.body.publication);
    const imageForm = JSON.parse(req.body.imageForm);

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    imageForm.fileName = req.file.originalname;

    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        publicationsLogic.getOnePublication(publication._id).then(pub => {
            pub.allImages.push(imageForm);
            const obj = {
                _id: publication._id,
                allImages: pub.allImages
            }
            publicationsLogic.patchPublication(obj);
        });
    }
    catch (err) {
        console.log(err);
    }
});
server.post('/add-publication', publicationUpload.array('file', 3), (req, res) => {
    for (let i = 0; i < req.files.length; i++) {
        const multerFileName = req.files[i].destination + "\\" + req.files[i].filename;
        const finalFileName = multerFileName;

        fs.rename(multerFileName, finalFileName, err => {
            if (err) {
                console.log(err);
                return;
            }
            if (i > 1) res.send("Done");
        });
    }

    let publication = JSON.parse(req.body.publication);
    publication.mainImageName = req.files[0].originalname;
    publication.video = req.files[1].originalname;
    publication.allImages = [
        { alt: publication.fullName, fileName: req.files[2].originalname }
    ];

    try {
        publicationsLogic.addPublication(publication);
    }
    catch (err) {
        console.log(err);
    }
});

server.listen(8080, () => console.log("Listening on http://localhost:8080"));
