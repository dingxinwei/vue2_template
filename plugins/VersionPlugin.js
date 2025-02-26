class VersionPlugin {
  constructor(options = {}) {
    this.filename = options.filename || 'version.txt';
  }
  apply(compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;
    compiler.hooks.emit.tapAsync('VersionPlugin', (compilation, callback) => {
      const currentTime = new Date().toLocaleString();
      const content = `Build Version: ${currentTime}`;
      // compilation.assets[this.filename] = {
      //   source: () => content,
      //   size: () => content.length,
      // };
      compilation.emitAsset(
        this.filename,
        new RawSource(content)
      );
      callback();
    });
  }
}
module.exports = VersionPlugin;
