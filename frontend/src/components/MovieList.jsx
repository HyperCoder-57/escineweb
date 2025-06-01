import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Simulación de carga de datos de películas (reemplazar con API real)
    const mockMovies = [
      { id: 5, title: "Lilo y Stitch", image: "https://image.tmdb.org/t/p/w500/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg", times: ["16:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 6, title: "Una película de Minecraft", image: "https://image.tmdb.org/t/p/w500/rZYYmjgyF5UP1AVsvhzzDOFLCwG.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 7, title: "Destino final: Lazos de sangre", image: "https://image.tmdb.org/t/p/w500/frNkbclQpexf3aUzZrnixF3t5Hw.jpg", times: ["16:00 PM", "20:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 8, title: "Until Dawn", image: "https://image.tmdb.org/t/p/w500/exgfubqSbF4veI4uXFOdbV66gEf.jpg", times: ["12:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 9, title: "A Working Man", image: "https://image.tmdb.org/t/p/w500/8jrIVxlydAdFmHpBGmKpv2DPIWJ.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 10, title: "Sikandar", image: "https://image.tmdb.org/t/p/w500/41s42CRXafa3OuRGvCtfYPEBmse.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 11, title: "Misión: Imposible - Sentencia final", image: "https://image.tmdb.org/t/p/w500/haOjJGUV00dKlZaJWgjM1UD1cJV.jpg", times: ["12:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 12, title: "La fuente de la eterna juventud", image: "https://image.tmdb.org/t/p/w500/9bhDUyOCrcwPLKbPyHM4uKOa65T.jpg", times: ["12:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 13, title: "La calle del terror: La reina del baile", image: "https://image.tmdb.org/t/p/w500/kYeTcmPmuMvBgmwOdOtR5fUwRuH.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 14, title: "Warfare. Tiempo de guerra", image: "https://image.tmdb.org/t/p/w500/fkVpNJugieKeTu7Se8uQRqRag2M.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 15, title: "The Legend of Ochi", image: "https://image.tmdb.org/t/p/w500/cORMkM2j7JDXIYGLdz9EHUM84aD.jpg", times: ["12:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 16, title: "Blancanieves", image: "https://image.tmdb.org/t/p/w500/sm91FNDF6OOKU4hT9BDW6EMoyDB.jpg", times: ["12:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 17, title: "Rosario", image: "https://image.tmdb.org/t/p/w500/mYK7OYW4w2ZujE8B8GGnVYZWHYD.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 18, title: "Lilo & Stitch", image: "https://image.tmdb.org/t/p/w500/9jrmKyhNGam2pj89bcxmhQzXCNo.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 19, title: "Capitán América: Brave New World", image: "https://image.tmdb.org/t/p/w500/vUNj55xlF0pSU5FU3yDHC6L5wVX.jpg", times: ["16:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 20, title: "Tin Soldier", image: "https://image.tmdb.org/t/p/w500/lFFDrFLXywFhy6khHes1LCFVMsL.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 21, title: "Los pecadores", image: "https://image.tmdb.org/t/p/w500/zdClwqpYQXBSCGGDMdtvsuggwec.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 22, title: "The Great Escape", image: "https://image.tmdb.org/t/p/w500/iTpgKfg70wbzA15xZF8k1lZhCgM.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 23, title: "Thunderbolts*", image: "https://image.tmdb.org/t/p/w500/cGOBis1KNC8AkYMcOEw4lCycfD1.jpg", times: ["14:00 PM", "16:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 24, title: "Extraterritorial", image: "https://image.tmdb.org/t/p/w500/bTYbNWz4kI1P3GzEVvWZwyZT7Uv.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 25, title: "Abduct", image: "https://image.tmdb.org/t/p/w500/2ZTp5eQ8C8W70rvXCkbdHQW0sM9.jpg", times: ["14:00 PM", "16:00 PM", "18:00 PM"], date: "2025-06-02" },
      { id: 26, title: "Mujer Valiente", image: "https://image.tmdb.org/t/p/w500/hdqbujWmlmsdVm62Ob8sGuC2kDk.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 27, title: "Tierras perdidas", image: "https://image.tmdb.org/t/p/w500/sLDxndoqFWwJEq7iEdYQBzPjUDQ.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-06-02" },
      { id: 28, title: "La bala perdida 3", image: "https://image.tmdb.org/t/p/w500/AoXAvZDxcym6oONBvJ82tFjEGdY.jpg", times: ["12:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 29, title: "Vaiana 2", image: "https://image.tmdb.org/t/p/w500/b1WsCRfomw7tRi12NuseKsAJxYK.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 30, title: "Bambi, una vida en el bosque", image: "https://image.tmdb.org/t/p/w500/fvtIXQH4JcifptPe0J9GfLDIOAQ.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 31, title: "Misión Panda en África", image: "https://image.tmdb.org/t/p/w500/3o0ktTmmf4wD2pzs2D7OMG6vT9a.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 32, title: "Estragos", image: "https://image.tmdb.org/t/p/w500/yN1WnHTyBUQobLmQAPeL100bQWg.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 33, title: "లైలా", image: "https://image.tmdb.org/t/p/w500/l4gsNxFPGpzbq0D6QK1a8vO1lBz.jpg", times: ["14:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 34, title: "El ladrón de joyas", image: "https://image.tmdb.org/t/p/w500/hzuus3qrQct2JeoAs2AGMYzKzjZ.jpg", times: ["18:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 35, title: "Rust", image: "https://image.tmdb.org/t/p/w500/tbJ3RkA2s6X5qrBzrYHYTxvDBui.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-02" },
      { id: 36, title: "The Haunting at Saint Joseph's", image: "https://image.tmdb.org/t/p/w500/ck9tMVSvGmkPuQvOezhfpYJMgs8.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 37, title: "Karate Kid: Legends", image: "https://image.tmdb.org/t/p/w500/efNhiZPk71FTYJ30dBkWMfc939D.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 38, title: "Misión: Imposible - Sentencia mortal parte uno", image: "https://image.tmdb.org/t/p/w500/83sGKvCv2T2CulYbd40Aeduc7n2.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 39, title: "Mufasa: El rey león", image: "https://image.tmdb.org/t/p/w500/dmw74cWIEKaEgl5Dv3kUTcCob6D.jpg", times: ["14:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 40, title: "Lilo & Stitch 2: El efecto del defecto", image: "https://image.tmdb.org/t/p/w500/l71VXcph19ZwJr2ZtEFuZA6ZzK5.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 41, title: "Expediente Bryson: Conjuring the Cult", image: "https://image.tmdb.org/t/p/w500/z4O2wCMm534pnoxXziQu95wMuX9.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 42, title: "Sonic 3: La película", image: "https://image.tmdb.org/t/p/w500/3aDWCRXLYOCuxjrjiPfLd79tcI6.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 43, title: "Destino final", image: "https://image.tmdb.org/t/p/w500/6F3MEcGHeMAMxledi7vQfqkZRkc.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 44, title: "새엄마의 욕망", image: "https://image.tmdb.org/t/p/w500/rYC6UyML4CU4zYiZVbDMrwnGyWW.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 45, title: "¡Qué Huevos, Sofía!", image: "https://image.tmdb.org/t/p/w500/6On03YOhaiQfsVkE0Amw3LVs1mE.jpg", times: ["14:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 46, title: "Чинк - хвостатый детектив", image: "https://image.tmdb.org/t/p/w500/fXkdpstjgSnaLX1iFxQh62mIa3L.jpg", times: ["14:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 47, title: "El Mono", image: "https://image.tmdb.org/t/p/w500/z15wy8YqFG8aCAkDQJKR63nxSmd.jpg", times: ["12:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 48, title: "Destino final 5", image: "https://image.tmdb.org/t/p/w500/T0IGau7Alj52OLrrthzftkLMIA.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 49, title: "Culpa mía", image: "https://image.tmdb.org/t/p/w500/gp31EwMH5D2bftOjscwkgTmoLAB.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 50, title: "El abismo secreto", image: "https://image.tmdb.org/t/p/w500/3s0jkMh0YUhIeIeioH3kt2X4st4.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 51, title: "Death of a Unicorn", image: "https://image.tmdb.org/t/p/w500/lXR32JepFwD1UHkplWqtBP1K79z.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 52, title: "Novocaine", image: "https://image.tmdb.org/t/p/w500/miHABFjxMyoKKtFMzqfaD8cU5Sk.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 53, title: "xXx", image: "https://image.tmdb.org/t/p/w500/gd4hRY3pFXRY7YVbMdVBpnKV7wC.jpg", times: ["12:00 PM", "14:00 PM", "16:00 PM"], date: "2025-06-02" },
      { id: 54, title: "Norbert", image: "https://image.tmdb.org/t/p/w500/2DYgEfgv1bOmgibE1kyPBmzxaf2.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 55, title: "Alba del desierto", image: "https://image.tmdb.org/t/p/w500/vJxo8xxVnSaPAf9EdkjAfKwmoQK.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 56, title: "Corazones rotos", image: "https://image.tmdb.org/t/p/w500/qaDDFibgdo3zJxoHb1pKLVNnciV.jpg", times: ["12:00 PM", "16:00 PM", "18:00 PM"], date: "2025-06-02" },
      { id: 57, title: "Robot salvaje", image: "https://image.tmdb.org/t/p/w500/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-02" },
      { id: 58, title: "Amenaza en el aire", image: "https://image.tmdb.org/t/p/w500/8T6nkYb4W8BIeafmFffyfsRciTL.jpg", times: ["14:00 PM", "16:00 PM", "18:00 PM"], date: "2025-06-01" },
      { id: 59, title: "Pánico en el tren bala", image: "https://image.tmdb.org/t/p/w500/qDyJuHpn0Sh19fMv52vRTwGBx4g.jpg", times: ["16:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 60, title: "性教育ママ", image: "https://image.tmdb.org/t/p/w500/xghWMg0pkBOdLHCTESyeyHU68wl.jpg", times: ["12:00 PM", "14:00 PM", "16:00 PM"], date: "2025-05-30" },
      { id: 61, title: "La fiebre de los ricos", image: "https://image.tmdb.org/t/p/w500/ymKkHgkgXQTObC17L0GRlALGPHZ.jpg", times: ["14:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 62, title: "Venom: El último baile", image: "https://image.tmdb.org/t/p/w500/8F74DwgFxTIBNtbqSLjR7zWmnHh.jpg", times: ["14:00 PM", "20:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 63, title: "My Massive Cock", image: "https://image.tmdb.org/t/p/w500/9JQHViS8uugeWKfFsnEj3xTB2dZ.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 64, title: "Day of Reckoning", image: "https://image.tmdb.org/t/p/w500/cVSjSQryFUERYSdOmdgJ2m0eBte.jpg", times: ["12:00 PM", "14:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 65, title: "L'Alcova", image: "https://image.tmdb.org/t/p/w500/l2CJZguM1GFtesUYc8nn7Ga1mpy.jpg", times: ["14:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-31" },
      { id: 66, title: "Deadpool y Lobezno", image: "https://image.tmdb.org/t/p/w500/9TFSqghEHrlBMRR63yTx80Orxva.jpg", times: ["18:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 67, title: "La hermanastra fea", image: "https://image.tmdb.org/t/p/w500/mk4vGUy03tUCgJsOuwkYy877RYo.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 68, title: "Van Gogh by Vincent", image: "https://image.tmdb.org/t/p/w500/z73X4WKZghBh5fri31o8P6vBEB2.jpg", times: ["12:00 PM", "16:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 69, title: "El gran dictador", image: "https://image.tmdb.org/t/p/w500/w7ovs2B2AlNRig68HOmuYVQRroQ.jpg", times: ["14:00 PM", "16:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 70, title: "Misión imposible", image: "https://image.tmdb.org/t/p/w500/xCpmxw3UUjv4PGzbIPOHeoKAV0l.jpg", times: ["12:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 71, title: "G20", image: "https://image.tmdb.org/t/p/w500/xihssRPgRDZ7xwIjx3xuPTnqPfU.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 72, title: "Saint Catherine", image: "https://image.tmdb.org/t/p/w500/hBJdzKPeDaC96AzlrtMWBomYSZV.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 73, title: "El Asedio", image: "https://image.tmdb.org/t/p/w500/d9jrfsJx7wkDnouIqwnXQ7xayIm.jpg", times: ["16:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 74, title: "Gru 4. Mi villano favorito", image: "https://image.tmdb.org/t/p/w500/wTpzSDfbUuHPEgqgt5vwVtPHhrb.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 75, title: "Mickey 17", image: "https://image.tmdb.org/t/p/w500/3ZMGC839jsKNAweGeQDBZDmu6ka.jpg", times: ["12:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 76, title: "La sustancia", image: "https://image.tmdb.org/t/p/w500/w1PiIqM89r4AM7CiMEP4VLCEFUn.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-06-02" },
      { id: 77, title: "Devara: Parte 1", image: "https://image.tmdb.org/t/p/w500/hdpYUidbB83AfemP369W7guOIlr.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 78, title: "Del revés 2 (Inside Out 2)", image: "https://image.tmdb.org/t/p/w500/lE3DCRI7bQgHSiIuEPcFiXpiuGV.jpg", times: ["12:00 PM", "14:00 PM", "16:00 PM"], date: "2025-05-31" },
      { id: 79, title: "Gladiator II", image: "https://image.tmdb.org/t/p/w500/fbcs5AxrdXwyj1b8bGGMgC9kXrM.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 80, title: "Leroy y Stitch", image: "https://image.tmdb.org/t/p/w500/8ddTcTllI5U1Gq2EvGYE2CBprOS.jpg", times: ["14:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-31" },
      { id: 81, title: "Kung Fu Panda 4", image: "https://image.tmdb.org/t/p/w500/7JspmokDnpm8SEg28wtstfGps0K.jpg", times: ["12:00 PM", "14:00 PM", "16:00 PM"], date: "2025-06-01" },
      { id: 82, title: "Pídeme lo que quieras", image: "https://image.tmdb.org/t/p/w500/5rtaLwyKAjbceww4J1ro8aA8BNB.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 83, title: "Ballerina, del universo de John Wick", image: "https://image.tmdb.org/t/p/w500/vAlIRnwdp17A6HsOcEoqZJk0ZqJ.jpg", times: ["14:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 84, title: "Los Vengadores", image: "https://image.tmdb.org/t/p/w500/ugX4WZJO3jEvTOerctAWJLinujo.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 85, title: "Gladiator II", image: "https://image.tmdb.org/t/p/w500/fbcs5AxrdXwyj1b8bGGMgC9kXrM.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 86, title: "Soul to Squeeze", image: "https://image.tmdb.org/t/p/w500/bBJGmU0ORhmo0liy7c3MdI8qOMU.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 87, title: "Kraven the Hunter", image: "https://image.tmdb.org/t/p/w500/gabWTSVhzltlKkmcqPoJmjKJxyb.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 88, title: "Cómo entrenar a tu dragón", image: "https://image.tmdb.org/t/p/w500/fTpbUIwdsfyIldzYvzQi2K4Icws.jpg", times: ["14:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 89, title: "Los Vengadores", image: "https://image.tmdb.org/t/p/w500/ugX4WZJO3jEvTOerctAWJLinujo.jpg", times: ["18:00 PM", "20:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 90, title: "Stream", image: "https://image.tmdb.org/t/p/w500/aqLBOmJ59FdEMXARmpDnwHrcfV2.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 91, title: "Flow", image: "https://image.tmdb.org/t/p/w500/337MqZW7xii2evUDVeaWXAtopff.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 92, title: "El contable 2", image: "https://image.tmdb.org/t/p/w500/njqLGG2djaHCe4bAG0ZhN9Z4x4t.jpg", times: ["14:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 93, title: "Amaran", image: "https://image.tmdb.org/t/p/w500/jVP3rAtgBMFH6RrSa6r4aP4wv1T.jpg", times: ["14:00 PM", "16:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 94, title: "Culpa tuya", image: "https://image.tmdb.org/t/p/w500/1jvCVdlgInyItAUEvvvCakm1Yxz.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-06-02" },
      { id: 95, title: "L'Alcova", image: "https://image.tmdb.org/t/p/w500/l2CJZguM1GFtesUYc8nn7Ga1mpy.jpg", times: ["12:00 PM", "16:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 96, title: "Palmer", image: "https://image.tmdb.org/t/p/w500/xSDdRAjxKAGi8fUBLOqSrBhJmF0.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 97, title: "Summer of 69", image: "https://image.tmdb.org/t/p/w500/xBmsHHLwvwI29oyFE48fKAnSQyk.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 98, title: "Des jours plus belles que la nuit", image: "https://image.tmdb.org/t/p/w500/uCkANtG6ezb7hjRKVudY3PUcbvn.jpg", times: ["12:00 PM", "14:00 PM", "18:00 PM"], date: "2025-06-02" },
      { id: 99, title: "La película de Stitch", image: "https://image.tmdb.org/t/p/w500/6MM0i4SrOPQblYSRS8jrOgZ4mlw.jpg", times: ["14:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 100, title: "Voces de libertad", image: "https://image.tmdb.org/t/p/w500/yCuph6GHSgRNpNYnkrxrXkyj6k5.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 101, title: "Anora", image: "https://image.tmdb.org/t/p/w500/tZCrWnyN4zEtJiFem5TFoYT8nxI.jpg", times: ["12:00 PM", "16:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 102, title: "Interstellar", image: "https://image.tmdb.org/t/p/w500/fbUwSqYIP0isCiJXey3staY3DNn.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 103, title: "Gunslingers", image: "https://image.tmdb.org/t/p/w500/O7REXWPANWXvX2jhQydHjAq2DV.jpg", times: ["12:00 PM", "16:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 104, title: "Fight or flight (sicarios en el aire)", image: "https://image.tmdb.org/t/p/w500/2CuB6MkeerEkfKCKF8TUgjyiVPS.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-06-02" },];
    setMovies(mockMovies);
  }, []);

  const currentTime = new Date().toLocaleString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true }) + " CST";
  const currentDate = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

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
            <Link to="/profile" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Perfil</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg text-black w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400">🔍</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setNotification('Inicia sesión para más opciones! 👤')}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all">
              <span className="text-xl text-black">👤</span>
            </div>
            <span className="text-sm mt-1 font-medium">Invitado</span>
          </div>
        </div>
      </header>

      {/* Banner de urgencia */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-white text-center mb-6 animate-pulse-slow relative z-10">
        <p className="text-sm font-bold">¡Explora las películas de hoy, {currentDate} a las {currentTime}! Más de 300 fans ya reservaron.</p>
      </div>

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-6xl mx-auto bg-gray-900 p-6 rounded-lg shadow-2xl border-l-4 border-amber-400 hover:shadow-amber-400/50 transition-all text-white">
          <h1 className="text-2xl font-bold mb-6">Películas Disponibles</h1>

          {/* Lista de películas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-amber-400/50 transition-all">
                <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded-t-lg" />
                <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
                <p className="text-sm text-gray-400">Horarios: {movie.times.join(', ')}</p>
                <p className="text-sm text-gray-400">Fecha: {new Date(movie.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <Link to={`/seat/${movie.id}`}>
                  <button className="mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-2 rounded-full hover:from-amber-400 hover:to-yellow-500 transition-all w-full text-center">
                    Reservar Ahora
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Notificaciones */}
          {notification && <p className="mt-4 text-center text-green-400">{notification}</p>}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            A Mr. Tony Production<br />EsCine © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MovieList;