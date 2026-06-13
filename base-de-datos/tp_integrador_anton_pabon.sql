-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-06-2026 a las 01:50:09
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
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `categoria`, `precio`, `descripcion`, `imagen`, `activo`) VALUES
(1, 'TrueMade Whey Protein', 'proteina', 105000.00, '- Proteína aislada y concentrada.\r\n- Recuperación muscular.\r\n- Después de entrenar o en cualquier momento del día.', 'https://www.enasport.com/cdn/shop/files/TMWP2lb-Va_2.webp?v=1779117352&width=800', 1),
(2, '100% Whey Protein', 'proteina', 79000.00, '- Proteína concentrada en polvo\r\n- Para cualquier momento del día. Desayunos, meriendas o post entreno.\r\n- Favorece la síntesis de masa muscular.', 'https://www.enasport.com/cdn/shop/files/100_W-FR.webp?v=1779453509&width=800', 1),
(3, 'Protein Bar', 'proteina', 37600.00, '- Caja de barras de proteína 16 unidades.\r\n- Favorece el desarrollo muscular.\r\n- Para consumir en cualquier momento y lugar.', 'https://www.enasport.com/cdn/shop/files/Pbar-Cddl.webp?v=1779117474&width=800', 1),
(4, 'Whey X Pro', 'proteina', 59000.00, '- Proteína aislada y concentrada, más creatina.\r\n- Todo en uno.\r\n- En cualquier momento del día.', 'https://www.enasport.com/cdn/shop/files/Wxpro1lb-Va.webp?v=1779453646&width=800', 1),
(5, 'Creatina Monohidrato', 'creatina', 40000.00, '- Creatina monohidrato micronizada.\r\n- En cualquier momento del día.\r\n- Favorece el crecimiento y desarrollo muscular.', 'https://www.enasport.com/cdn/shop/files/CreaN300Mono_70b6fe3e-aaaa-443c-8b96-99609eaca224.webp?v=1779459679&width=800', 1),
(6, 'Creatina + Electrolitos', 'creatina', 39000.00, '- Creatina + electrolitos en polvo.\r\n- Favorece el crecimiento y desarrollo muscular.', 'https://www.enasport.com/cdn/shop/files/Crea_ElectPL.webp?v=1779463617&width=800', 1),
(7, 'Creatina Monohidrato 1 Kg', 'creatina', 115000.00, '- Creatina monohidrato micronizada.\r\n- En cualquier momento del día.\r\n- Favorece el crecimiento y desarrollo muscular.', 'https://www.enasport.com/cdn/shop/files/Crea-1Kg.webp?v=1779888288&width=800', 1),
(8, 'Creatina Monohidrato Creapure ', 'creatina', 50000.00, '- Creatina monohidrato Creapure en polvo\r\n- En cualquier momento del día\r\n- Potencia tu rendimiento', 'https://www.enasport.com/cdn/shop/files/CreaPure.webp?v=1779462758&width=800', 1),
(9, 'Shaker Premium Truemade', 'shaker', 27000.00, '- Shaker Premium.\r\n- Con resorte mezclador.\r\n- Tapa a rosca.', 'https://www.enasport.com/cdn/shop/files/Shaker_PTM.webp?v=1779799794&width=800', 1),
(10, 'Shaker ENA', 'shaker', 6700.00, '- Shaker de 500 cm3.\r\n- Práctico.', 'https://www.enasport.com/cdn/shop/products/Shaker_truemade.jpg?v=1738843158&width=800', 1),
(11, 'Shaker PLUS', 'shaker', 7400.00, '- Shaker con compartimientos.\r\n- Práctico.\r\n- Tapa a rosca.', 'https://www.enasport.com/cdn/shop/products/Shaker_truemade_PLUS.jpg?v=1640024209&width=800', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
