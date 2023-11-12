import path from "path";
import { Configuration } from "webpack";

const server: Configuration = {
    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, ".svg"],
        modules: ["public", "src", "node_modules"],
    },
    target: "node",
    mode: "development",
    entry: "./src/server/server.ts",
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                include: /node_modules/,
                use: ["html-loader"], // Используем html-loader для обработки HTML файлов
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.(scss)$/,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(css)$/,
                include: path.resolve(__dirname, "src", "render"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(css)$/,
                include: path.resolve(__dirname, "public"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(svg|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/", // Папка, куда будут скопированы файлы
                        },
                    },
                ],
            },
        ],
    },
};

export default [server];
