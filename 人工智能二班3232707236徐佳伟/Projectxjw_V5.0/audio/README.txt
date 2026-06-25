====================================
  音乐播放器 - 音频文件存放说明
====================================

请将你的 MP3 音频文件放在此文件夹中。

示例文件结构：
  audio/
  ├── song1.mp3
  ├── song2.mp3
  └── song3.mp3

然后在 music.html 文件中找到 playlist 数组，添加对应歌曲信息：

  var playlist = [
      { title: '歌曲名', artist: '歌手', src: 'audio/song1.mp3' },
      { title: '歌曲名', artist: '歌手', src: 'audio/song2.mp3' },
      { title: '歌曲名', artist: '歌手', src: 'audio/song3.mp3' }
  ];

注意：
- src 路径相对于 music.html 文件
- 支持的音频格式：MP3、WAV、OGG 等浏览器支持的格式
- 建议使用 MP3 格式以获得最佳兼容性
