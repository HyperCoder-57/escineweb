import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora para el boleto gratis (en segundos)
  const [currentIndexEstrenos, setCurrentIndexEstrenos] = useState(0);
  const [currentIndexTodas, setCurrentIndexTodas] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const carouselEstrenosRef = useRef(null);
  const carouselTodasRef = useRef(null);

  const estrenos = [
    { id: 1, title: "Misión: Imposible - La sentencia final", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FhaOjJGUV00dKlZaJWgjM1UD1cJV.jpg&w=256&q=75" },
    { id: 2, title: "Karate Kid: Leyendas", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FefNhiZPk71FTYJ30dBkWMfc939D.jpg&w=640&q=75" },
    { id: 3, title: "La formula del agua", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F2egvcQPqrXBgPHdK6hhznptaiiY.jpg&w=256&q=75" },
    { id: 4, title: "El amateur: Operación venganza", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F1LKXRXycQAx7slS7AVNPUg2qvpY.jpg&w=640&q=75" },
    { id: 5, title: "Lilo y Stitch", poster: "https://image.tmdb.org/t/p/w500/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg" },
    { id: 6, title: "Una película de Minecraft", poster: "https://image.tmdb.org/t/p/w500/rZYYmjgyF5UP1AVsvhzzDOFLCwG.jpg" },
    { id: 7, title: "Destino final: Lazos de sangre", poster: "https://image.tmdb.org/t/p/w500/frNkbclQpexf3aUzZrnixF3t5Hw.jpg" },
    { id: 8, title: "Until Dawn", poster: "https://image.tmdb.org/t/p/w500/exgfubqSbF4veI4uXFOdbV66gEf.jpg" },
    { id: 9, title: "A Working Man", poster: "https://image.tmdb.org/t/p/w500/8jrIVxlydAdFmHpBGmKpv2DPIWJ.jpg" },
    { id: 10, title: "Sikandar", poster: "https://image.tmdb.org/t/p/w500/41s42CRXafa3OuRGvCtfYPEBmse.jpg" },
    { id: 11, title: "Misión: Imposible - Sentencia final", poster: "https://image.tmdb.org/t/p/w500/haOjJGUV00dKlZaJWgjM1UD1cJV.jpg" },
    { id: 12, title: "La fuente de la eterna juventud", poster: "https://image.tmdb.org/t/p/w500/9bhDUyOCrcwPLKbPyHM4uKOa65T.jpg" },
    { id: 13, title: "La calle del terror: La reina del baile", poster: "https://image.tmdb.org/t/p/w500/kYeTcmPmuMvBgmwOdOtR5fUwRuH.jpg" },
    { id: 14, title: "Warfare. Tiempo de guerra", poster: "https://image.tmdb.org/t/p/w500/fkVpNJugieKeTu7Se8uQRqRag2M.jpg" },
    { id: 15, title: "The Legend of Ochi", poster: "https://image.tmdb.org/t/p/w500/cORMkM2j7JDXIYGLdz9EHUM84aD.jpg" },
    { id: 16, title: "Blancanieves", poster: "https://image.tmdb.org/t/p/w500/sm91FNDF6OOKU4hT9BDW6EMoyDB.jpg" },
    { id: 17, title: "Rosario", poster: "https://image.tmdb.org/t/p/w500/mYK7OYW4w2ZujE8B8GGnVYZWHYD.jpg" },
    { id: 18, title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/w500/9jrmKyhNGam2pj89bcxmhQzXCNo.jpg" },
    { id: 19, title: "Capitán América: Brave New World", poster: "https://image.tmdb.org/t/p/w500/vUNj55xlF0pSU5FU3yDHC6L5wVX.jpg" },
    { id: 20, title: "Tin Soldier", poster: "https://image.tmdb.org/t/p/w500/lFFDrFLXywFhy6khHes1LCFVMsL.jpg" },
    { id: 21, title: "Los pecadores", poster: "https://image.tmdb.org/t/p/w500/zdClwqpYQXBSCGGDMdtvsuggwec.jpg" },
    { id: 22, title: "The Great Escape", poster: "https://image.tmdb.org/t/p/w500/iTpgKfg70wbzA15xZF8k1lZhCgM.jpg" },
    { id: 23, title: "Thunderbolts*", poster: "https://image.tmdb.org/t/p/w500/cGOBis1KNC8AkYMcOEw4lCycfD1.jpg" },
    { id: 24, title: "Extraterritorial", poster: "https://image.tmdb.org/t/p/w500/bTYbNWz4kI1P3GzEVvWZwyZT7Uv.jpg" },
  ];

  const todasPeliculas = [
    { id: 1, title: "Avengers", poster: "https://www18.pelisplushd.to/poster/the-avengers-los-vengadores-thumb.jpg" },
    { id: 2, title: "La gran Aventura", poster: "https://www18.pelisplushd.to/poster/la-gran-aventura-lego-thumb.jpg" },
    { id: 3, title: "Top Gun Maverick", poster: "https://www18.pelisplushd.to/poster/top-gun-maverick-thumb.jpg" },
    { id: 4, title: "Sin Límites", poster: "https://www18.pelisplushd.to/poster/sin-limites-thumb.jpg" },
    { id: 5, title: "La Llegada", poster: "https://www18.pelisplushd.to/poster/la-llegada-thumb.jpg" },
    { id: 5, title: "Cadena perpetua", poster: "https://image.tmdb.org/t/p/w500/uRRTV7p6l2ivtODWJVVAMRrwTn2.jpg" },
    { id: 6, title: "El padrino", poster: "https://image.tmdb.org/t/p/w500/5HlLUsmsv60cZVTzVns9ICZD6zU.jpg" },
    { id: 7, title: "El Padrino Parte II", poster: "https://image.tmdb.org/t/p/w500/mbry0W5PRylSUHsYzdiY2FSJwze.jpg" },
    { id: 8, title: "La lista de Schindler", poster: "https://image.tmdb.org/t/p/w500/3Ho0pXsnMxpGJWqdOi0KDNdaTkT.jpg" },
    { id: 9, title: "12 hombres sin piedad", poster: "https://image.tmdb.org/t/p/w500/qyVoDb3EKO5SnhpSRpztNmZjo70.jpg" },
    { id: 10, title: "El viaje de Chihiro", poster: "https://image.tmdb.org/t/p/w500/laXrmaTRuroArSPfsGlvTbeWxVA.jpg" },
    { id: 11, title: "El caballero oscuro", poster: "https://image.tmdb.org/t/p/w500/8QDQExnfNFOtabLDKqfDQuHDsIg.jpg" },
    { id: 12, title: "Un amor contra viento y marea", poster: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg" },
    { id: 13, title: "La milla verde", poster: "https://image.tmdb.org/t/p/w500/aBQiJRxGRrX0mXFMjxyzWYFtEnf.jpg" },
    { id: 14, title: "Parásitos", poster: "https://image.tmdb.org/t/p/w500/4N55tgxDW0RRATyrZHbx0q9HUKv.jpg" },
    { id: 15, title: "Pulp Fiction", poster: "https://image.tmdb.org/t/p/w500/hNcQAuquJxTxl2fJFs1R42DrWcf.jpg" },
    { id: 16, title: "El señor de los anillos: El retorno del rey", poster: "https://image.tmdb.org/t/p/w500/mWuFbQrXyLk2kMBKF9TUPtDwuPx.jpg" },
    { id: 17, title: "Your Name", poster: "https://image.tmdb.org/t/p/w500/iaiy3tg9QVkDpObm1IGqmbC9A5C.jpg" },
    { id: 18, title: "Forrest Gump", poster: "https://image.tmdb.org/t/p/w500/oiqKEhEfxl9knzWXvWecJKN3aj6.jpg" },
    { id: 19, title: "El bueno, el feo y el malo", poster: "https://image.tmdb.org/t/p/w500/rDD8KmcPLfHabdPMs7S7XjKL1mV.jpg" },
    { id: 20, title: "Interstellar", poster: "https://image.tmdb.org/t/p/w500/fbUwSqYIP0isCiJXey3staY3DNn.jpg" },
    { id: 21, title: "Uno de los nuestros", poster: "https://image.tmdb.org/t/p/w500/ii4bYbHN6HtVGK700AlphS56hD2.jpg" },
    { id: 22, title: "Los siete samuráis", poster: "https://image.tmdb.org/t/p/w500/zr4DkzWIMjaWtj6hlsbN6dnNeTX.jpg" },
    { id: 23, title: "La tumba de las luciérnagas", poster: "https://image.tmdb.org/t/p/w500/juKTAn2AuoE9MvCNvf3kwZrt1t4.jpg" },
    { id: 24, title: "La vida es bella", poster: "https://image.tmdb.org/t/p/w500/aZ7MFlKPfB02Lr9NwZQ4vsYRgcy.jpg" },
    { id: 25, title: "El Club de la Lucha", poster: "https://image.tmdb.org/t/p/w500/sgTAWJFaB2kBvdQxRGabYFiQqEK.jpg" },
    { id: 26, title: "Cinema Paradiso", poster: "https://image.tmdb.org/t/p/w500/hHwsr3t5n7VVUbPyU8VZswn0jkL.jpg" },
    { id: 27, title: "Ciudad de Dios", poster: "https://image.tmdb.org/t/p/w500/2MztAexSbCVszezV0bKMKZPJAZf.jpg" },
    { id: 28, title: "O Auto da Compadecida", poster: "https://image.tmdb.org/t/p/w500/xWCKF7hgOicb3A0XiY13SdlwRcn.jpg" },
    { id: 29, title: "Psicosis", poster: "https://image.tmdb.org/t/p/w500/xFbnc2QPG5H5gYWsGbZT4q8Akya.jpg" },
    { id: 30, title: "El señor de los anillos: La comunidad del anillo", poster: "https://image.tmdb.org/t/p/w500/9xtH1RmAzQ0rrMBNUMXstb2s3er.jpg" },
    { id: 31, title: "Cosas imposibles", poster: "https://image.tmdb.org/t/p/w500/eaf7GQj0ieOwm08rrvjJQNbN0kN.jpg" },
    { id: 32, title: "Harakiri", poster: "https://image.tmdb.org/t/p/w500/3uRTEObwdN7Q3u5xswL2Vf8EsOn.jpg" },
    { id: 33, title: "Alguien voló sobre el nido del cuco", poster: "https://image.tmdb.org/t/p/w500/lBYmCynNEPt7HVaJvuXgfHvLhbJ.jpg" },
    { id: 34, title: "Gabriel's Inferno", poster: "https://image.tmdb.org/t/p/w500/yXRoyYzIo17HfANn07oXYdyBy4h.jpg" },
    { id: 35, title: "Érase una vez en América", poster: "https://image.tmdb.org/t/p/w500/u4VnqaxINtKVscmdldZsBojU6jm.jpg" },
    { id: 36, title: "El señor de los anillos: Las dos torres", poster: "https://image.tmdb.org/t/p/w500/z632eZtXaw76ZE5mMMGOBXCpm1T.jpg" },
    { id: 37, title: "Spider-Man: un nuevo universo", poster: "https://image.tmdb.org/t/p/w500/xRMZikjAHNFebD1FLRqgDZeGV4a.jpg" },
    { id: 38, title: "El castillo ambulante", poster: "https://image.tmdb.org/t/p/w500/p8EARnEw8KPZzlZg3vkseYVMczu.jpg" },
    { id: 39, title: "So Won", poster: "https://image.tmdb.org/t/p/w500/PZlNvDwKwHeHUsXnd6SEDXWZNn.jpg" },
    { id: 40, title: "El imperio contraataca", poster: "https://image.tmdb.org/t/p/w500/eU7KcNAOeZj9PBIcGUMSsuJz8qj.jpg" },
    { id: 41, title: "A Silent Voice", poster: "https://image.tmdb.org/t/p/w500/jAhaGJPreBrSWMN92MP2jjIDJKy.jpg" },
    { id: 42, title: "Gabriel's Inferno: Part II", poster: "https://image.tmdb.org/t/p/w500/x5o8cLZfEXMoZczTYWLrUo1P7UJ.jpg" },
    { id: 43, title: "El pianista", poster: "https://image.tmdb.org/t/p/w500/mxfLOWnHnSlbdraKfzRn5mqoqk7.jpg" },
    { id: 44, title: "El infierno de Gabriel Parte 3", poster: "https://image.tmdb.org/t/p/w500/fYtHxTxlhzD4QWfEbrC1rypysSD.jpg" },
    { id: 45, title: "Whiplash", poster: "https://image.tmdb.org/t/p/w500/sL32IZkyjlF7otj5vcUxiKSKzg5.jpg" },
    { id: 46, title: "Seven: Los Siete Pecados Capitales", poster: "https://image.tmdb.org/t/p/w500/uVPcVz4b2hnSGrXYLdIGRXwcivs.jpg" },
    { id: 47, title: "Primal: Tales of Savagery", poster: "https://image.tmdb.org/t/p/w500/9NBBkdxH0TjQEBSN2AzeE1sgsF9.jpg" },
    { id: 48, title: "Origen", poster: "https://image.tmdb.org/t/p/w500/tXQvtRWfkUUnWJAn2tN3jERIUG.jpg" },
    { id: 49, title: "La ventana indiscreta", poster: "https://image.tmdb.org/t/p/w500/fH1MipE8PXGg0rlI5cUdzxKnyA2.jpg" },
    { id: 50, title: "Radical", poster: "https://image.tmdb.org/t/p/w500/eSatbygYZp8ooprBHZdb6GFZxGB.jpg" },
    { id: 51, title: "El silencio de los corderos", poster: "https://image.tmdb.org/t/p/w500/8FdQQ3cUCs9goEOr1qUFaHackoJ.jpg" },
    { id: 52, title: "Un ángel en nuestras vidas", poster: "https://image.tmdb.org/t/p/w500/yfnJ5qIYx7q33fY4jqv9Pu95RSg.jpg" },
    { id: 53, title: "Spider-Man: Cruzando el Multiverso", poster: "https://image.tmdb.org/t/p/w500/37WcNMgNOMxdhT87MFl7tq7FM1.jpg" },
    { id: 54, title: "El infierno del odio", poster: "https://image.tmdb.org/t/p/w500/pXXemxg8s7PHlide0A6cmb3UVU8.jpg" },
    { id: 55, title: "Contraataque", poster: "https://image.tmdb.org/t/p/w500/kxnFdLJhi37ZVFDCL1ka0yeQVU5.jpg" },
    { id: 56, title: "La leyenda de Hei", poster: "https://image.tmdb.org/t/p/w500/ogMVWcW6TSBl65heyUHnuYpTlBm.jpg" },
    { id: 57, title: "En la misma clase", poster: "https://image.tmdb.org/t/p/w500/7byisQANRFHf9SC60n5PaLywuMa.jpg" },
    { id: 58, title: "American History X", poster: "https://image.tmdb.org/t/p/w500/h2cDqHvnZkycBJKoF7WhcQ2MX1V.jpg" },
    { id: 59, title: "La princesa Mononoke", poster: "https://image.tmdb.org/t/p/w500/7fUjg7jky5FnnNSiSbWyOlxVYGU.jpg" },
    { id: 60, title: "Las Quintillizas: La Película", poster: "https://image.tmdb.org/t/p/w500/6QsExD8uP3vLk64yLnxD8MSS4A6.jpg" },
    { id: 61, title: "Regreso al futuro", poster: "https://image.tmdb.org/t/p/w500/k3naCOK9ZQ5Mc7HhfHKN3zyray9.jpg" },
    { id: 62, title: "Robot salvaje", poster: "https://image.tmdb.org/t/p/w500/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg" },
    { id: 63, title: "Vivir", poster: "https://image.tmdb.org/t/p/w500/eDg67pLOtZAewt0hKIoinECpzCG.jpg" },
    { id: 64, title: "Un día de verano", poster: "https://image.tmdb.org/t/p/w500/g5gMOcn0vFUITufKSxxL2WCyBIU.jpg" },
    { id: 65, title: "Perfect Blue", poster: "https://image.tmdb.org/t/p/w500/kk8p22JheV6MB0fBXOOUgZK9UWQ.jpg" },
    { id: 66, title: "El club de los poetas muertos", poster: "https://image.tmdb.org/t/p/w500/lzvt7u7A6oxePzczURHQXEUTXNS.jpg" },
    { id: 67, title: "El profesional (Léon)", poster: "https://image.tmdb.org/t/p/w500/eWf4KEaCpiWcDOBkTiNQ0328k3H.jpg" },
    { id: 68, title: "Josee, el tigre y los peces", poster: "https://image.tmdb.org/t/p/w500/buF1mmMRAiJZMOK5Qg3DBTtZ5XO.jpg" },
    { id: 69, title: "El gran dictador", poster: "https://image.tmdb.org/t/p/w500/w7ovs2B2AlNRig68HOmuYVQRroQ.jpg" },
    { id: 70, title: "Dedicada A Mi Ex", poster: "https://image.tmdb.org/t/p/w500/xc4bTXVwYNXi10jG9dwcaYt5IpU.jpg" },
    { id: 71, title: "El crepúsculo de los dioses", poster: "https://image.tmdb.org/t/p/w500/sVILYytrnjsEXBcZyxHMJ5jP74t.jpg" },
    { id: 72, title: "Érase una vez un estudio", poster: "https://image.tmdb.org/t/p/w500/81BdCKeRtyHr0muZY72zYr0JM3j.jpg" },
    { id: 73, title: "The End of Evangelion", poster: "https://image.tmdb.org/t/p/w500/9jbxvKB937BWeYAmMKZTqPxBLsk.jpg" },
    { id: 74, title: "Hasta que llegó su hora", poster: "https://image.tmdb.org/t/p/w500/upiek8u4rHTrOJW9B0woXe4A4h7.jpg" },
    { id: 75, title: "En el bosque de la luz de las luciérnagas", poster: "https://image.tmdb.org/t/p/w500/xE763r1dnYji0gOxrSxBtzyouSf.jpg" },
    { id: 76, title: "Una mujer y tres hombres", poster: "https://image.tmdb.org/t/p/w500/jsjfvG1971tCUPtvj1dNSPWNzST.jpg" },
    { id: 77, title: "Tiempos modernos", poster: "https://image.tmdb.org/t/p/w500/f3uOJseH4oPEo0Sq7WyQ6IwMG4l.jpg" },
    { id: 78, title: "¡Qué bello es vivir!", poster: "https://image.tmdb.org/t/p/w500/63W4MsB8e5whhPNyxhRVTzSsCje.jpg" },
    { id: 79, title: "Given: The Movie", poster: "https://image.tmdb.org/t/p/w500/fsEq2LddodaHvhs4mTZAaqOV6sR.jpg" },
    { id: 80, title: "Violet Evergarden: La película", poster: "https://image.tmdb.org/t/p/w500/5E1JUJAWzd8ylHIhTLsowW2RCBE.jpg" },
    { id: 81, title: "Intocable", poster: "https://image.tmdb.org/t/p/w500/edPWyHqknFuxFY3sdmC3LtJITWC.jpg" },
    { id: 82, title: "Apocalypse Now", poster: "https://image.tmdb.org/t/p/w500/6H4KLXvam8f5tihmU80yRSfj5Fl.jpg" },
    { id: 83, title: "Luces de la ciudad", poster: "https://image.tmdb.org/t/p/w500/15bnFY02iqWB6jN0sjxsxMNrmWS.jpg" },
    { id: 84, title: "El rey león", poster: "https://image.tmdb.org/t/p/w500/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg" },
    { id: 85, title: "Milagro en la celda 7", poster: "https://image.tmdb.org/t/p/w500/scxBIHaT1ZiPDPJu3vKd9Yn5gBA.jpg" },
    { id: 86, title: "Senderos de gloria", poster: "https://image.tmdb.org/t/p/w500/vz8J8nTbF5JP7PQK4VNVsO8rzCy.jpg" },
    { id: 87, title: "La leyenda del pianista en el océano", poster: "https://image.tmdb.org/t/p/w500/td38NLfhvwotZhKKHGXd71BKiox.jpg" },
    { id: 88, title: "Old Boy", poster: "https://image.tmdb.org/t/p/w500/45kRW1xgTq3QrZltL9mY9e9iYkH.jpg" },
    { id: 89, title: "Clouds", poster: "https://image.tmdb.org/t/p/w500/d0OdD1I8qAfETvE9Rp9Voq7R8LR.jpg" },
    { id: 90, title: "La evasión", poster: "https://image.tmdb.org/t/p/w500/Al1F9o6fDkOBRngeG2FTJ0f9xTv.jpg" },
    { id: 91, title: "Seishun Buta Yarou wa Yumemiru Shoujo no Yume wo Minai", poster: "https://image.tmdb.org/t/p/w500/2Tpyv4cwwyE2xV9bqx7DOWnUCZ5.jpg" },
    { id: 92, title: "Como caído del cielo", poster: "https://image.tmdb.org/t/p/w500/xg6QZdlHrq2dtSK8cfnQQMnmpeY.jpg" },
    { id: 93, title: "Taylor Swift: Gira de estadios Reputation", poster: "https://image.tmdb.org/t/p/w500/u6oXUTtOuJRPdUgUuPAVVJPSKCo.jpg" },
    { id: 94, title: "Vengadores: Endgame", poster: "https://image.tmdb.org/t/p/w500/br6krBFpaYmCSglLBWRuhui7tPc.jpg" },
    { id: 95, title: "Klaus", poster: "https://image.tmdb.org/t/p/w500/aLniylyJlbXEdxvaGSuQkRACWUx.jpg" },
    { id: 96, title: "Quiero comerme tu páncreas", poster: "https://image.tmdb.org/t/p/w500/1rgR2oMVFuk4ltx6tYXYskPaA6Y.jpg" },
    { id: 97, title: "Toda una vida en un año", poster: "https://image.tmdb.org/t/p/w500/xGDbQI7Gtgurt9W5ez6Tim2lpS2.jpg" },
    { id: 98, title: "A dos metros de ti", poster: "https://image.tmdb.org/t/p/w500/4F5LggLzv2VIa0MJT2ETN8bWtr2.jpg" },
    { id: 99, title: "Vengadores: Infinity War", poster: "https://image.tmdb.org/t/p/w500/ksBQ4oHQDdJwND8H90ay8CbMihU.jpg" },
    { id: 100, title: "Ven y mira", poster: "https://image.tmdb.org/t/p/w500/3trCyueh2CBTlRrpq7xElqSWHTh.jpg" },
    { id: 101, title: "Green Book", poster: "https://image.tmdb.org/t/p/w500/od2A7qPtpimcYfqfKXkpHqoKyuS.jpg" },
    { id: 102, title: "Mommy", poster: "https://image.tmdb.org/t/p/w500/1mjhmc2iG8Oe5WTqevECTUQ5iWP.jpg" },
    { id: 103, title: "Matrix", poster: "https://image.tmdb.org/t/p/w500/tpW2X2DvxtTHJ61iJ7zNYYrJihs.jpg" },
    { id: 104, title: "Evangelion: 3.0+1.01 Thrice Upon a Time", poster: "https://image.tmdb.org/t/p/w500/2QiEVEePwGGwzCWaxrVR5B4LLnu.jpg" },
    
  ];

  // Crear arrays extendidos para simular el carousel infinito
  const extendedEstrenos = [
    ...estrenos.slice(-1),
    ...estrenos,
    ...estrenos.slice(0, 1),
  ];

  const extendedTodas = [
    ...todasPeliculas.slice(-1),
    ...todasPeliculas,
    ...todasPeliculas.slice(0, 1),
  ];

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/auth');
  };
  const handleExplore = () => navigate('/movielist');
  const handleCloseBanner = () => setShowBanner(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Manejo del carousel infinito para Estrenos
  const handlePrevEstrenos = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexEstrenos((prev) => prev - 1);
  };

  const handleNextEstrenos = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexEstrenos((prev) => prev + 1);
  };

  // Manejo del carousel infinito para Todas las Películas
  const handlePrevTodas = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexTodas((prev) => prev - 1);
  };

  const handleNextTodas = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexTodas((prev) => prev + 1);
  };

  // Ajuste para el carousel infinito (Estrenos)
  const handleTransitionEndEstrenos = () => {
    setIsTransitioning(false);
    if (currentIndexEstrenos === 0) {
      setCurrentIndexEstrenos(estrenos.length);
      carouselEstrenosRef.current.style.transition = 'none';
      carouselEstrenosRef.current.style.transform = `translateX(-${estrenos.length * (100 / 3)}%)`;
    } else if (currentIndexEstrenos === extendedEstrenos.length - 1) {
      setCurrentIndexEstrenos(1);
      carouselEstrenosRef.current.style.transition = 'none';
      carouselEstrenosRef.current.style.transform = `translateX(-${(100 / 3)}%)`;
    }
  };

  // Ajuste para el carousel infinito (Todas las Películas)
  const handleTransitionEndTodas = () => {
    setIsTransitioning(false);
    if (currentIndexTodas === 0) {
      setCurrentIndexTodas(todasPeliculas.length);
      carouselTodasRef.current.style.transition = 'none';
      carouselTodasRef.current.style.transform = `translateX(-${todasPeliculas.length * (100 / 3)}%)`;
    } else if (currentIndexTodas === extendedTodas.length - 1) {
      setCurrentIndexTodas(1);
      carouselTodasRef.current.style.transition = 'none';
      carouselTodasRef.current.style.transform = `translateX(-${(100 / 3)}%)`;
    }
  };

  useEffect(() => {
    setCurrentIndexEstrenos(1); // Iniciar en el primer elemento real
    setCurrentIndexTodas(1);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-bg-fade relative overflow-hidden">
      {/* Partículas de fondo (efecto estelar) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-blue-800 bg-opacity-90 text-white p-4 shadow-lg z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Cinema Logo" className="max-h-16 w-auto object-contain" />
          </Link>
          <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
            <Link to="/" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Contacto</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg text-black w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400">🔍</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all">
              <span className="text-xl text-black">👤</span>
            </div>
            <span className="text-sm mt-1 font-medium">{isLoggedIn ? "Usuario" : "Invitado"}</span>
          </div>
        </div>
      </header>

      {/* Banner de urgencia y prueba social */}
      {showBanner && (
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-white text-center mb-6 animate-pulse-slow relative z-10">
          <span
            className="absolute top-2 right-2 text-white hover:text-gray-300 cursor-pointer text-xl"
            onClick={handleCloseBanner}
          >
            ✕
          </span>
          <p className="text-sm font-bold">
            ¡Únete hoy, 24 de mayo de 2025, a millones de cinéfilos! 
            <span className="block md:inline">Regístrate ahora y recibe un boleto gratis (queda {formatTime(timeLeft)}).</span>
          </p>
          <button
            onClick={handleAuth}
            className="mt-2 bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-amber-400/50"
          >
            ¡Regístrate y vive la magia!
          </button>
        </div>
      )}

      {/* Diálogo Modal */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-sm transform animate-fade-in">
            <span
              className="absolute top-2 right-2 text-white hover:text-gray-300 cursor-pointer text-xl"
              onClick={handleCloseDialog}
            >
              ✕
            </span>
            <h3 className="text-lg font-bold text-amber-400 mb-4">Estado de Sesión</h3>
            <p className="text-white mb-4">
              {isLoggedIn ? "¡Ya estás listo para la magia del cine!" : "¡Aún no estás dentro de la aventura! Inicia sesión o regístrate para descubrir contenido exclusivo."}
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center">
                <button
                  onClick={handleAuth}
                  className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-400 transition-all shadow-md hover:shadow-amber-600/50"
                >
                  Iniciar sesión o registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        {/* Sección Explorar */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-amber-400 mb-4 animate-fade-in-up">¡Embárcate en tu aventura cinematográfica!</h2>
          <button
            onClick={handleExplore}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-amber-400/50 animate-pulse-slow"
          >
            Explorar ahora
          </button>
        </section>

        {/* Sección Estrenos - Carousel Infinito */}
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-4 animate-fade-in-up">Estrenos</h2>
          <div className="relative">
            <button
              onClick={handlePrevEstrenos}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ◄
            </button>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl overflow-hidden">
                <div
                  ref={carouselEstrenosRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndexEstrenos * (100 / 3)}%)` }}
                  onTransitionEnd={handleTransitionEndEstrenos}
                >
                  {extendedEstrenos.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className="w-48 flex-shrink-0 px-2">
                      <Link to={`/reservation/${movie.id}`} className="block">
                        <div className="relative group">
                          <div className="aspect-[2/3] overflow-hidden rounded-lg">
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                            <p className="text-white text-sm font-semibold">{movie.title}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleNextEstrenos}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ►
            </button>
          </div>
        </section>

        {/* Sección Todas las Películas - Carousel Infinito */}
        <section>
          <h2 className="text-3xl font-extrabold text-white mb-4 animate-fade-in-up">Todas las Películas</h2>
          <div className="relative">
            <button
              onClick={handlePrevTodas}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ◄
            </button>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl overflow-hidden">
                <div
                  ref={carouselTodasRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndexTodas * (100 / 3)}%)` }}
                  onTransitionEnd={handleTransitionEndTodas}
                >
                  {extendedTodas.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className="w-48 flex-shrink-0 px-2">
                      <Link to={`/reservation/${movie.id}`} className="block">
                        <div className="relative group">
                          <div className="aspect-[2/3] overflow-hidden rounded-lg">
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                            <p className="text-white text-sm font-semibold">{movie.title}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleNextTodas}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ►
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            A Mr. Tony Production <br />EsCine © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;