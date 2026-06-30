-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2026 a las 23:24:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp_integrador_anton_pabon`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` enum('proteina','creatina','shaker') NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `categoria`, `precio`, `imagen`, `activo`) VALUES
(1, 'TrueMade Whey Protein', 'proteina', 105011.00, 'https://www.enasport.com/cdn/shop/files/TMWP2lb-Va_2.webp?v=1779117352&width=800', 1),
(3, 'Protein Bar', 'proteina', 37600.00, 'https://www.enasport.com/cdn/shop/files/Pbar-Cddl.webp?v=1779117474&width=800', 0),
(4, 'Whey X Pro', 'proteina', 59007.00, 'https://www.enasport.com/cdn/shop/files/Wxpro1lb-Va.webp?v=1779453646&width=800', 0),
(5, 'Creatina Monohidrato', 'creatina', 40001.00, 'https://www.enasport.com/cdn/shop/files/CreaN300Mono_70b6fe3e-aaaa-443c-8b96-99609eaca224.webp?v=1779459679&width=800', 0),
(6, 'Creatina + Electrolitos', 'creatina', 39001.00, 'https://www.enasport.com/cdn/shop/files/Crea_ElectPL.webp?v=1779463617&width=800', 1),
(7, 'Creatina Monohidrato 1 Kg', 'creatina', 115000.00, 'https://www.enasport.com/cdn/shop/files/Crea-1Kg.webp?v=1779888288&width=800', 1),
(8, 'Creatina Monohidrato Creapure ', 'creatina', 50000.00, 'https://www.enasport.com/cdn/shop/files/CreaPure.webp?v=1779462758&width=800', 1),
(9, 'Shaker Premium Truemade', 'shaker', 27000.00, 'https://www.enasport.com/cdn/shop/files/Shaker_PTM.webp?v=1779799794&width=800', 1),
(10, 'Shaker ENA', 'shaker', 6700.00, 'https://www.enasport.com/cdn/shop/products/Shaker_truemade.jpg?v=1738843158&width=800', 1),
(11, 'Shaker PLUS', 'shaker', 7400.00, 'https://www.enasport.com/cdn/shop/products/Shaker_truemade_PLUS.jpg?v=1640024209&width=800', 1),
(300, 'gav', 'shaker', 33335.00, 'https://www.enasport.com/cdn/shop/files/100_W-FR.webp?v=1779453509&width=800', 0),
(302, 'botella', 'shaker', 300.00, 'https://cdn.shopify.com/s/files/1/0156/6146/files/images-1LWaterBottleBlackI2A6T_BBBB_0001_V2.jpg?v=1763562900', 1),
(303, 'botella2', 'shaker', 400.00, 'https://cdn.shopify.com/s/files/1/1367/5201/files/images-SportsBottlewithStrawLidGSBlackI1B6L_BB2J_0012_V3.jpg?v=1769450571', 1),
(305, 'botella3', 'shaker', 444.00, 'https://cdn.shopify.com/s/files/1/0156/6146/files/images-2_2LWaterBottleBlackI1A2U_BBBB_8393_V2.jpg?v=1763562534', 1),
(307, 'botella5', 'shaker', 666.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXfcLCaM9Y2h0QIPjaG6hd8D3lYklfUxjXWNtSNsxBo-YBDps4H7-0Zqzf&s=10', 1),
(308, 'isolate', 'proteina', 700.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIy0IoU7lBbS4JtF0DSq3LRPhd6N4DdxO9ShMNIKOBv6QQhB-xqRk3W9VD&s=10', 1),
(309, 'proteina helado', 'proteina', 777.00, 'https://xmastergym.com/wp-content/uploads/2025/10/Whey-Protein-Vainilla-xmaster-gym-300x300.webp', 1),
(311, 'eeee', 'creatina', 333.00, 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx02992/y/8.jpg', 1),
(312, 'qqq', 'creatina', 999.00, 'https://goodfitness.com.ar/wp-content/uploads/2021/09/creatina-500-pulver.jpg', 1),
(313, 'yyyyyyyyy', 'shaker', 666.00, 'https://cdn.farmacialeloir.com.ar/img/articulos/2024/02/optimum_nutrition_shaker_vaso_mezclador_imagen1.jpg', 1),
(314, 'das', 'shaker', 5654.00, 'https://d22fxaf9t8d39k.cloudfront.net/d3409d93dcdc06ac94d8102b7badfec5724f8eb7611edaebc342a16ae300e5c5208165.png', 1),
(316, 'trees', 'shaker', 1250.00, 'https://m.media-amazon.com/images/I/5199x+BfZuL.jpg', 1),
(317, 'asd', 'shaker', 333.00, 'https://http2.mlstatic.com/D_NQ_NP_2X_858157-MLA99921473521_112025-F.webp', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `es_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `es_admin`) VALUES
(1, 'pepe', 'pepe@hola.com', 'contraseña', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `precio_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_productos`
--

CREATE TABLE `ventas_productos` (
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas_productos`
--
ALTER TABLE `ventas_productos`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=318;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas_productos`
--
ALTER TABLE `ventas_productos`
  ADD CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `id_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
