module.exports = {
  name: 'signature',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/signature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
