const JSZip = require('jszip');

class Subtitles {
    OpenSubtitles;
    token;

    constructor() {
        const OS = require('opensubtitles-api');
        this.OpenSubtitles = new OS('TemporaryUserAgent');

        this.OpenSubtitles.api.LogIn('', '', 'tr', 'TemporaryUserAgent').then((res) => {
            this.token = res.token;
        });
    }

    srtToWebVTT = (data) => {
      let srt = data.replace(/\r+/g, '');
      srt = srt.replace(/^\s+|\s+$/g, '');
      let cuelist = srt.split('\n\n');
      let result = "";
      if (cuelist.length > 0) {
        result += "WEBVTT\n\n";
        for (let i = 0; i < cuelist.length; i=i+1) {
          result += this.convertSrtCue(cuelist[i]);
        }
      }
      return result;
    }

    convertSrtCue = (caption) => {
      let cue = "";
      let s = caption.split(/\n/);
      while (s.length > 3) {
          for (let i = 3; i < s.length; i++) {
              s[2] += "\n" + s[i]
          }
          s.splice(3, s.length - 3);
      }
      let line = 0;
      if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
        cue += s[0].match(/\w+/) + "\n";
        line += 1;
      }
      if (s[line].match(/\d+:\d+:\d+/)) {
        let m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
        if (m) {
          cue += m[1]+":"+m[2]+":"+m[3]+"."+m[4]+" --> " +m[5]+":"+m[6]+":"+m[7]+"."+m[8]+" line:13 size:90%" + "\n";
          line += 1;
        } else {
          return "";
        }
      } else {
        return "";
      }
      if (s[line]) {
        cue += s[line] + "\n\n";
      }
      return cue;
    }

    zipToSubtitle = async (data, callback) => {
        let decoder = new TextDecoder(data.SubEncoding);
        let arrBuffer = await fetch(data.ZipDownloadLink).then(r => r.blob());
        let zip = new JSZip();
        zip.loadAsync(arrBuffer)
        .then((zip) => {
            let fileNames = Object.keys(zip.files);
            if(fileNames.length > 0) {
                let vtt = fileNames.find(i => i.endsWith(".vtt"));
                if(typeof(vtt) !== "undefined") {
                    let vttFile = zip.files[vtt];
                    vttFile.async('nodebuffer').then((content) => {
                        callback(
                            {
                                status: 200,
                                data: decoder.decode(content)
                            }
                        );
                    });
                    return;
                }
                let srt = fileNames.find(i => i.endsWith(".srt"));
                if(typeof(srt) !== "undefined") {
                    let srtFile = zip.files[srt];
                    srtFile.async('nodebuffer').then((content) => {
                        let decodedText = decoder.decode(content);
                        let webvtt = this.srtToWebVTT(decodedText);
                        callback(
                            {
                                status: 200,
                                content: webvtt
                            }
                        );
                    });
                }
            }
        }, () => {
            callback(
                {
                    status: 404,
                    content: "An error occurred while unzipping the subtitle file."
                }
            );
        });
    }

    search = async (keyword) => {
        let s = await this.OpenSubtitles.api.SearchSubtitles(this.token, [
            { 'sublanguageid': localStorage.getItem("subLanguageId") || "eng", 'query': keyword },
        ]);
        
        if(typeof(s.data) !== "undefined")
            return s.data;
        return [];
    }
}

export default Subtitles;