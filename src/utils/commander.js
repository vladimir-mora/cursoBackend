const { Command } = require("commander");
const program = new Command();

program.option("--mode <type>", "Modo de ejecucion", "production");
program.parse();

module.exports = program;
