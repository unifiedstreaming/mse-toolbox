package ;
import haxe.Json;
import haxe.io.UInt8Array;
typedef Boxes = {
  var boxes:Map<String,String> ;
  var fields:Map<String,String>;
  var debug:Bool;
  var warningHandler:Dynamic->Void;
}

/*
    inspired on

    mp4box.js Copyright (c) 2012. Telecom ParisTech/TSI/MM/GPAC Cyril Concolato
    https://github.com/gpac/mp4box.js

    hasplayer.js Copyright (c) 2014, Orange
    https://github.com/Orange-OpenSource/hasplayer.js/blob/4fb7720a94792d85f794bb533e490b4174b3f107/app/js/streaming/Mp4Processor.js
    https://github.com/Orange-OpenSource/hasplayer.js/blob/4fb7720a94792d85f794bb533e490b4174b3f107/app/lib/mp4lib/mp4lib-boxes.js
    https://github.com/Orange-OpenSource/hasplayer.js/blob/4fb7720a94792d85f794bb533e490b4174b3f107/app/lib/mp4lib/mp4lib-fields.js

    This library is untested, without any warranty
*/
#if standalone
@:expose("mp4lib")
#end
class Mp4lib {
  static var boxTypeArray:Map<String, Dynamic> =
  [   "moov" => mp4lib.MovieBox,
      "moof" => mp4lib.MovieFragmentBox,
      "ftyp" => mp4lib.FileTypeBox,
      "mfhd" => mp4lib.MovieFragmentHeaderBox,
      "mfra" => mp4lib.MovieFragmentRandomAccessBox,
      "udta" => mp4lib.UserDataBox,
      "trak" => mp4lib.TrackBox,
      "edts" => mp4lib.EditBox,
      "mdia" => mp4lib.MediaBox,
      "minf" => mp4lib.MediaInformationBox,
      "dinf" => mp4lib.DataInformationBox,
      "stbl" => mp4lib.SampleTableBox,
      "mvex" => mp4lib.MovieExtendsBox,
      "traf" => mp4lib.TrackFragmentBox,
      "meta" => mp4lib.MetaBox,
      "mvhd" => mp4lib.MovieHeaderBox,
      "mdat" => mp4lib.MediaDataBox,
      "free" => mp4lib.FreeSpaceBox,
      "sidx" => mp4lib.SegmentIndexBox,
      "tkhd" => mp4lib.TrackHeaderBox,
      "mdhd" => mp4lib.MediaHeaderBox,
      "mehd" => mp4lib.MovieExtendsHeaderBox,
      "hdlr" => mp4lib.HandlerBox,
      "stts" => mp4lib.TimeToSampleBox,
      "stsc" => mp4lib.SampleToChunkBox,
      "stco" => mp4lib.ChunkOffsetBox,
      "trex" => mp4lib.TrackExtendsBox,
      "vmhd" => mp4lib.VideoMediaHeaderBox,
      "smhd" => mp4lib.SoundMediaHeaderBox,
      "dref" => mp4lib.DataReferenceBox,
      "url " => mp4lib.DataEntryUrlBox,
      "urn " => mp4lib.DataEntryUrnBox,
      "tfhd" => mp4lib.TrackFragmentHeaderBox,
      "tfdt" => mp4lib.TrackFragmentBaseMediaDecodeTimeBox,
      "trun" => mp4lib.TrackFragmentRunBox,
      "stsd" => mp4lib.SampleDescriptionBox,
      "sdtp" => mp4lib.SampleDependencyTableBox,
      "avc1" => mp4lib.AVC1VisualSampleEntryBox,
      "encv" => mp4lib.EncryptedVideoBox,
      "avcC" => mp4lib.AVCConfigurationBox,
      "pasp" => mp4lib.PixelAspectRatioBox,
      "mp4a" => mp4lib.MP4AudioSampleEntryBox,
      "enca" => mp4lib.EncryptedAudioBox,
      "esds" => mp4lib.ESDBox,
      "stsz" => mp4lib.SampleSizeBox,
      "pssh" => mp4lib.ProtectionSystemSpecificHeaderBox,
      "saiz" => mp4lib.SampleAuxiliaryInformationSizesBox,
      "saio" => mp4lib.SampleAuxiliaryInformationOffsetsBox,
      "sinf" => mp4lib.ProtectionSchemeInformationBox,
      "schi" => mp4lib.SchemeInformationBox,
      "tenc" => mp4lib.TrackEncryptionBox,
      "schm" => mp4lib.SchemeTypeBox,
      "elst" => mp4lib.EditListBox,
      "hmhd" => mp4lib.HintMediaHeaderBox,
      "nmhd" => mp4lib.NullMediaHeaderBox,
      "ctts" => mp4lib.CompositionOffsetBox,
      "cslg" => mp4lib.CompositionToDecodeBox,
      "stss" => mp4lib.SyncSampleBox,
      "tref" => mp4lib.TrackReferenceBox,
      "frma" => mp4lib.OriginalFormatBox,
      "stpp" => mp4lib.SubtitleSampleEntry,
      "emsg" => mp4lib.DASHEventMessageBox,
      "btrt" => mp4lib.MPEG4BitRateBox,
      
      //extended types
      Json.stringify([0x6D, 0x1D, 0x9B, 0x05, 0x42, 0xD5, 0x44, 0xE6, 0x80, 0xE2, 0x14, 0x1D, 0xAF, 0xF7, 0x57, 0xB2]) => mp4lib.TfxdBox,
      Json.stringify([0xD4, 0x80, 0x7E, 0xF2, 0xCA, 0x39, 0x46, 0x95, 0x8E, 0x54, 0x26, 0xCB, 0x9E, 0x46, 0xA7, 0x9F]) => mp4lib.TfrfBox,
      Json.stringify([0xD0, 0x8A, 0x4F, 0x18, 0x10, 0xF3, 0x4A, 0x82, 0xB6, 0xC8, 0x32, 0xD8, 0xAB, 0xA1, 0x83, 0xD3]) => mp4lib.PiffProtectionSystemSpecificHeaderBox,
      Json.stringify([0x89, 0x74, 0xDB, 0xCE, 0x7B, 0xE7, 0x4C, 0x51, 0x84, 0xF9, 0x71, 0x48, 0xF9, 0x88, 0x25, 0x54]) => mp4lib.PiffTrackEncryptionBox,
      Json.stringify([0xA2, 0x39, 0x4F, 0x52, 0x5A, 0x9B, 0x4F, 0x14, 0xA2, 0x44, 0x6C, 0x42, 0x7C, 0x64, 0x8D, 0xF4]) => mp4lib.PiffSampleEncryptionBox   ];

  public function new() {}

  @:keep
  public static function Version()
    return Macros.GetVersion();
  
  public static function doGenerateInitSegment(?tracks:Array<Mp4Track> = null):UInt8Array{
    var moov_file = new mp4lib.File();
    
    // Create Movie box (moov)
    var moov = new mp4lib.MovieBox();
    
    // Create and add MovieHeader box (mvhd)
    moov.boxes.push(doMovieHeaderBox(tracks));
    
    for (track in tracks) {
        // Create and add Track box (trak)
        moov.boxes.push(doTrackBox(track));
    }

    // Create and add MovieExtends box (mvex)
    moov.boxes.push(doMovieExtendsBox(tracks));
    
    // Create and add Protection System Specific Header box (pssh)
    for (track in tracks) {
        if (track.contentProtection != null) {
          //TODO:
          //  supportedKS = this.protectionExt.getSupportedKeySystemsFromContentProtection(tracks[i].contentProtection);
          //  moov.boxes.push.apply(moov.boxes, createProtectionSystemSpecificHeaderBox(supportedKS));
        }
    }
    
    moov_file.boxes.push(new mp4lib.FileTypeBox());

    moov_file.boxes.push(moov);
    //trace(serialize(cast moov_file).view.buffer.toHex());
    return serialize(cast moov_file);
  }
  
  public static function doMovieHeaderBox(tracks:Array<Mp4Track>):mp4lib.MovieHeaderBox {

      // Movie Header Box
      // This box defines overall information which is media-independent, and relevant to the
      // entire presentation considered as a whole.

      // Create MovieHeader box (mvhd)
      var mvhd = new mp4lib.MovieHeaderBox();
      var track = tracks[tracks.length - 1]; // take last track to determine get track id

      mvhd.version = 1; // version = 1  in order to have 64bits duration value
      mvhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
      mvhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
      mvhd.timescale = track.timescale; // the time-scale for the entire presentation => take timescale of current adaptationSet
      mvhd.duration = haxe.Int64.mul(track.duration, track.timescale); // the length of the presentation (in the indicated timescale) =>  take duration of period
      mvhd.rate = 0x00010000; // 16.16 number, "1.0" = normal playback
      mvhd.volume = 0x0100; // 8.8 number, "1.0" = full volume
      mvhd.reserved = 0;
      mvhd.reserved_2 = [0x0, 0x0];
      mvhd.matrix = [0x00010000, 0x0, 0x0, 0x0, 0x00010000, 0x0, 0x0, 0x0, 0x40000000]; // provides a transformation matrix for the video; (u,v,w) are restricted here to (0,0,1),
      // hex values (0,0,0x40000000)
      mvhd.pre_defined = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
      mvhd.next_track_ID = track.trackId + 1; // indicates a value to use for the track ID of the next track to be added to this presentation
      mvhd.flags = 0; //default value

      return mvhd;
  }

  public static function doMovieExtendsBox(tracks:Array<Mp4Track>):mp4lib.MovieExtendsBox {

    var mvex;
        //mehd,
    var trex;
    //var track = tracks[tracks.length - 1];
    //var i;

    // Create Movie Extends Box (mvex)
    // This box warns readers that there might be Movie Fragment Boxes in this file
    mvex = new mp4lib.MovieExtendsBox();

    // Create Movie Extends Header Box (mehd)
    // The Movie Extends Header is optional, and provides the overall duration, including fragments, of a fragmented
    // movie. If this box is not present, the overall duration must be computed by examining each fragment.
    // mehd is optional
    /*if (track.duration !== Number.POSITIVE_INFINITY) {
        mehd = new mp4lib.boxes.MovieExtendsHeaderBox();
        mehd.version = 1;
        mehd.flags = 0;
        mehd.fragment_duration = Math.round(track.duration * track.timescale); // declares length of the presentation of the whole movie including fragments
        //add mehd box in mvex box
        mvex.boxes.push(mehd);
    }*/

    for (track in tracks) {
        // Create Track Extend Box (trex), exactly one for each track in the movie box
        // This sets up default values used by the movie fragments. By setting defaults in this way, space and
        // complexity can be saved in each Track Fragment Box.
        trex = new mp4lib.TrackExtendsBox();
        trex.version = 0;
        trex.flags = 0;
        trex.track_ID = track.trackId; // identifies the track; this shall be the track ID of a track in the Movie Box
        trex.default_sample_description_index = 1; // Set default value
        trex.default_sample_duration = 0; // ''
        trex.default_sample_flags = 0; // ''
        trex.default_sample_size = 0; // ''

        // add trex box in mvex box
        mvex.boxes.push(trex);
    }

    return mvex;
  }
  public static function doTrackBox(track:Mp4Track):mp4lib.TrackBox {
    // Track Box: This is a container box for a single track of a presentation
    // Track Header Box: This box specifies the characteristics of a single track
    var trak:mp4lib.TrackBox;
    var tkhd:mp4lib.TrackHeaderBox;
    var mdia:mp4lib.MediaBox;
    
    trak = new mp4lib.TrackBox();

    tkhd = new mp4lib.TrackHeaderBox();

    tkhd.version = 1; // version = 1  in order to have 64bits duration value
    tkhd.flags = 0x1 | 0x2 | 0x4; //Track_enabled: Indicates that the track is enabled. Flag value is 0x000001. A disabled track (the low
    //bit is zero) is treated as if it were not present.
    //Track_in_movie: Indicates that the track is used in the presentation. Flag value is 0x000002.
    //Track_in_preview: Indicates that the track is used when previewing the presentation. Flag value is 0x000004.
    tkhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
    tkhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
    tkhd.track_id = track.trackId; // uniquely identifies this track over the entire life-time of this presentation
    tkhd.reserved = 0;
    tkhd.duration = haxe.Int64.mul(track.duration, track.timescale); // the duration of this track (in the timescale indicated in the Movie Header Box) =>  take duration of period
    tkhd.reserved_2 = [0x0, 0x0];
    tkhd.layer = 0; // specifies the front-to-back ordering of video tracks; tracks with lower numbers are closer to the viewer => 0 since only one video track
    tkhd.alternate_group = 0; // specifies a group or collection of tracks => ignore
    tkhd.volume = 0x0100; // 8.8 number, "1.0" = full volume
    tkhd.reserved_3 = 0;
    tkhd.matrix = [0x00010000, 0x0, 0x0, 0x0, 0x00010000, 0x0, 0x0, 0x0, 0x40000000]; // provides a transformation matrix for the video; (u,v,w) are restricted here to (0,0,1),
    tkhd.width = track.width << 16; // visual presentation size as fixed-point 16.16 values
    tkhd.height = track.height << 16; // visual presentation size as fixed-point 16.16 values

    trak.boxes.push(tkhd);

    //Create container for the track information in a track (mdia)
    mdia = new mp4lib.MediaBox();

    //Create and add Media Header Box (mdhd)
    mdia.boxes.push(doMediaHeaderBox(track));

    //Create and add Handler Reference Box (hdlr)
    mdia.boxes.push(doHandlerReferenceBox(track));

    //Create and add Media Information Box (minf)
    mdia.boxes.push(doMediaInformationBox(track));

    trak.boxes.push(mdia);

    return trak;
  }
  
  public static function doMediaInformationBox(track:Mp4Track):mp4lib.MediaInformationBox {
      // This box contains all the objects that declare characteristic information of the media in the track.
      var minf = new mp4lib.MediaInformationBox();

      //Create and add the adapted media header box (vmhd, smhd or nmhd) for audio, video or text.
      switch (track.type) {
          case 'video':
              minf.boxes.push(doVideoMediaHeaderBox());
          case 'audio':
              minf.boxes.push(doSoundMediaHeaderBox());
          default:
              //TODO:
              //minf.boxes.push(createNullMediaHeaderBox(track));
      }

      //Create and add Data Information Box (dinf)
      minf.boxes.push(doDataInformationBox());

      //Create and add Sample Table Box (stbl)
      minf.boxes.push(doSampleTableBox(track));

      return minf;
  }
  
  private static function doSampleTableBox(track:Mp4Track):mp4lib.SampleTableBox {
    //The sample table contains all the time and data indexing of the media samples in a track. Using the tables
    //here, it is possible to locate samples in time, determine their type (e.g. I-frame or not), and determine their
    //size, container, and offset into that container.
    var stbl = new mp4lib.SampleTableBox();

    //create and add Decoding Time to Sample Box (stts)
    stbl.boxes.push(doDecodingTimeToSampleBox());

    //create and add Sample to Chunk Box (stsc)
    stbl.boxes.push(doSampleToChunkBox());

    //create and add Chunk Offset Box (stco)
    stbl.boxes.push(doChunkOffsetBox());

    //create and add Sample Size Box (stsz)
    stbl.boxes.push(doSampleSizeBox());

    //create and add Sample Description Box (stsd)
    stbl.boxes.push(doSampleDescriptionBox(track));

    return stbl;
  }
  
  private static function doSampleDescriptionBox(track:Mp4Track):mp4lib.SampleDescriptionBox {
    //The sample description table gives detailed information about the coding type used, and any initialization
    //information needed for that coding.
    var stsd = new mp4lib.SampleDescriptionBox();
    stsd.version = 0;
    stsd.flags = 0;

    switch (track.type) {
        case "video":
            stsd.boxes.push(doVisualSampleEntry(track));
        case "audio":
            stsd.boxes.push(doAudioSampleEntry(track));
        default:
            //NAN : To do add text entry

    }

    return stsd;
  }
  
  private static function doAudioSampleEntry(track:Mp4Track):mp4lib.Box {
    var codec = track.codecs.substring(0, track.codecs.indexOf('.'));

    switch (codec) {
        case "mp4a":
            return createMP4AudioSampleEntry(track);
        default:
            throw {
                name: "MediaPlayer.dependencies.ErrorHandler.prototype.MEDIA_ERR_CODEC_UNSUPPORTED",
                message: "Codec is not supported",
                data: {
                    codec: codec
                }
            };
    }

    return null;  
  }
  private static function doVisualSampleEntry(track:Mp4Track):mp4lib.Box {
    var codec = track.codecs.substring(0, track.codecs.indexOf('.'));
    var retval = null;
    switch (codec) {
        case "avc1":
            retval = createAVCVisualSampleEntry(track);
        default:
            throw {
                name: "MediaPlayer.dependencies.ErrorHandler.prototype.MEDIA_ERR_CODEC_UNSUPPORTED",
                message: "Codec is not supported",
                data: {
                    codec: codec
                }
            };
    }
    return retval;
  }
  
  private static function createMPEG4AACESDescriptor(track:Mp4Track):UInt8Array {
      var audioSpecificConfig;
      var dsiLength;
      var decoderSpecificInfo;
      var dcdLength;
      var decoderConfigDescriptor;
      var esdLength;
      var esDescriptor:haxe.io.BytesBuffer = new haxe.io.BytesBuffer();

      // AudioSpecificConfig
      // defined in ISO/IEC 14496-3, subpart 1
      // => AudioSpecificConfig corresponds to hex bytes contained in "codecPrivateData" field
      audioSpecificConfig = parseHexString(track.codecPrivateData);

      // DecoderSpecificInfo
      // defined in ISO/IEC 14496-1 (Systems), extends a BaseDescriptor
      dsiLength = audioSpecificConfig.length;
      decoderSpecificInfo = new haxe.io.BytesBuffer(); // 2 = tag + size bytes
      decoderSpecificInfo.addByte(0x05); // bit(8), tag=0x05 (DecSpecificInfoTag)
      decoderSpecificInfo.addByte(dsiLength); // bit(8), size
      decoderSpecificInfo.addBytes(audioSpecificConfig.view.buffer, 0, audioSpecificConfig.length); // AudioSpecificConfig bytes

      // DecoderConfigDescriptor
      // defined in ISO/IEC 14496-1 (Systems), extends a BaseDescriptor
      dcdLength = 13 + decoderSpecificInfo.length; // 2 = tag + size bytes
      decoderConfigDescriptor = new haxe.io.BytesBuffer();
      decoderConfigDescriptor.addByte(0x04); // bit(8), tag=0x04 (DecoderConfigDescrTag)
      decoderConfigDescriptor.addByte(dcdLength); // bit(8), size
      decoderConfigDescriptor.addByte(0x40); // bit(8), objectTypeIndication=0x40 (MPEG-4 AAC)
      decoderConfigDescriptor.addByte(0x05 << 2 // bit(6), streamType=0x05 (Audiostream)
        | 0 << 1    // bit(1), upStream=0
        | 1);       // bit(1), reserved=1
      decoderConfigDescriptor.addByte(0xFF); // bit(24), buffersizeDB=undefined
      decoderConfigDescriptor.addByte(0xFF); // ''
      decoderConfigDescriptor.addByte(0xFF); // ''
      decoderConfigDescriptor.addByte((track.bandwidth & 0xFF000000) >> 24); // bit(32), maxBitrate=undefined
      decoderConfigDescriptor.addByte((track.bandwidth & 0x00FF0000) >> 16); // ''
      decoderConfigDescriptor.addByte((track.bandwidth & 0x0000FF00) >> 8); // ''
      decoderConfigDescriptor.addByte(track.bandwidth & 0x000000FF); // ''
      decoderConfigDescriptor.addByte((track.bandwidth & 0xFF000000) >> 24); // bit(32), avgbitrate
      decoderConfigDescriptor.addByte(0 | (track.bandwidth & 0x00FF0000) >> 16); // ''
      decoderConfigDescriptor.addByte(0 | (track.bandwidth & 0x0000FF00) >> 8); // ''
      decoderConfigDescriptor.addByte(0 | (track.bandwidth & 0x000000FF)); // ''
      
      var decoderSpecificInfoBytes = decoderSpecificInfo.getBytes();
      decoderConfigDescriptor.addBytes(decoderSpecificInfoBytes, 0, decoderSpecificInfoBytes.length); // DecoderSpecificInfo bytes

      // ES_Descriptor
      // defined in ISO/IEC 14496-1 (Systems), extends a BaseDescriptor
      esdLength = 3 + decoderConfigDescriptor.length;
      esDescriptor.addByte(0x03); // bit(8), tag=0x03 (ES_DescrTag)
      esDescriptor.addByte(esdLength); // bit(8), size
      esDescriptor.addByte((track.trackId & 0xFF00) >> 8); // bit(16), ES_ID=track_id
      esDescriptor.addByte((track.trackId & 0x00FF)); // ''
      esDescriptor.addByte(0); // bit(8), flags and streamPriority
      
      var decoderConfigDescriptorBytes = decoderConfigDescriptor.getBytes();
      esDescriptor.addBytes(decoderConfigDescriptorBytes, 0, decoderConfigDescriptorBytes.length); // decoderConfigDescriptor bytes
      

      return UInt8Array.fromBytes(esDescriptor.getBytes());
  }
  
  private static function createMP4AudioSampleEntry(track:Mp4Track):mp4lib.Box {
      var mp4a:mp4lib.AudioSampleEntryContainerBox = null;
      var esdBox;
      var ES_Descriptor;

      if (track.contentProtection != null) {
          mp4a = new mp4lib.EncryptedAudioBox();
      } else {
          mp4a = new mp4lib.MP4AudioSampleEntryBox();
      }

      // SampleEntry fields
      mp4a.reserved = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
      mp4a.data_reference_index = 1; // ??

      // AudioSampleEntry fields
      mp4a.reserved_2 = [0x0, 0x0]; // default value = 0
      mp4a.channelcount = track.channels; // number of channels
      mp4a.samplesize = 16; // default value = 16
      mp4a.pre_defined = 0; // default value = 0
      mp4a.reserved_3 = 0; // default value = 0
      mp4a.samplerate = track.samplingRate << 16; // sampling rate, as fixed-point 16.16 values

      esdBox = new mp4lib.ESDBox();
      ES_Descriptor = createMPEG4AACESDescriptor(track);
      esdBox.ES_tag = ES_Descriptor[0];
      esdBox.ES_length = ES_Descriptor[1];
      esdBox.ES_data = UInt8Array.fromBytes(ES_Descriptor.view.sub(2, ES_Descriptor.length).buffer);
      esdBox.version = 0;
      esdBox.flags = 0;

      // MP4AudioSampleEntry fields
      mp4a.boxes.push(esdBox);

      if (track.contentProtection != null) {
          // create and add Protection Scheme Info Box
          mp4a.boxes.push(createProtectionSchemeInfoBox(track));
      }

      return mp4a;
  }
  
  private static function createAVCVisualSampleEntry(track:Mp4Track):mp4lib.VisualSampleEntryContainerBox {
      var avc1:mp4lib.VisualSampleEntryContainerBox = null;

      //An AVC visual sample entry shall contain an AVC Configuration Box
      if (track.contentProtection != null) {
          avc1 = new mp4lib.EncryptedVideoBox();
      } else {
          avc1 = new mp4lib.AVC1VisualSampleEntryBox();
      }

      avc1.data_reference_index = 1; //To DO... ??
      avc1.compressorname = "AVC Coding"; //is a name, for informative purposes. It is formatted in a fixed 32-byte field, with the first
      //byte set to the number of bytes to be displayed, followed by that number of bytes of displayable data,
      //and then padding to complete 32 bytes total (including the size byte). The field may be set to 0.
      avc1.depth = 0x0018; //takes one of the following values 0x0018 – images are in colour with no alpha.
      avc1.reserved = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0]; //default value = 0
      avc1.reserved_2 = 0; //default value = 0
      avc1.reserved_3 = 0; //default value = 0
      avc1.pre_defined = 0; //unsigned int(16) pre_defined = 0;
      avc1.pre_defined_2 = [0x0, 0x0, 0x0]; //unsigned int(32)[3] pre_defined = 0;
      avc1.pre_defined_3 = 65535; //int(16) pre_defined = -1;
      avc1.frame_count = 1; //template unsigned int(16) frame_count = 1;indicates how many frames of compressed video are stored in each sample. The default is
      //1, for one frame per sample; it may be more than 1 for multiple frames per sample
      avc1.horizresolution = 0x00480000; // 72 dpi
      avc1.vertresolution = 0x00480000; // 72 dpi

      avc1.height = track.height; //are the maximum visual width and height of the stream described by this sample
      avc1.width = track.width; //description, in pixels

      //create and add AVC Configuration Box (avcC)
      avc1.boxes.push(createAVCConfigurationBox(track));

      if (track.contentProtection != null) {
          // create and add Protection Scheme Info Box
          avc1.boxes.push(createProtectionSchemeInfoBox(track));
      }

      return cast avc1;
  }
  
  private static function createProtectionSchemeInfoBox(track:Mp4Track) {
      //create Protection Scheme Info Box
      var sinf = new mp4lib.ProtectionSchemeInformationBox();

      //create and add Original Format Box => indicate codec type of the encrypted content
      sinf.boxes.push(createOriginalFormatBox(track));

      //create and add Scheme Type box
      sinf.boxes.push(createSchemeTypeBox());

      //create and add Scheme Information Box
      sinf.boxes.push(createSchemeInformationBox(track));

      return sinf;
  }
  private static function createSchemeInformationBox(track:Mp4Track){
    var schi = new mp4lib.SchemeInformationBox();

    //create and add Track Encryption Box
    schi.boxes.push(createTrackEncryptionBox(track));

    return schi;
  }  
  
  private static function createTrackEncryptionBox(track:Mp4Track){
    var tenc = new mp4lib.TrackEncryptionBox();

    tenc.flags = 0; //default value
    tenc.version = 0; //default value

    tenc.default_IsEncrypted = 0x1; //default value
    tenc.default_IV_size = 8; //default value, NA => à préciser
    tenc.default_KID = (track.contentProtection && (track.contentProtection.length) > 0 && Reflect.hasField(track.contentProtection[0], "cenc:default_KID")) ?
        Reflect.field(track.contentProtection[0], "cenc:default_KID") :
        [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];

    return tenc;
  }  
  
  private static function createSchemeTypeBox(){
    var schm = new mp4lib.SchemeTypeBox();

    schm.flags = 0;
    schm.version = 0;
    schm.scheme_type = 0x63656E63; //'cenc' => common encryption
    schm.scheme_version = 0x00010000; // version set to 0x00010000 (Major version 1, Minor version 0)

    return schm;
  }
  private static function createOriginalFormatBox(track:Mp4Track){
      var frma = new mp4lib.OriginalFormatBox();
      frma.data_format = stringToCharCode(track.codecs.substring(0, track.codecs.indexOf('.')));
      return frma;
  }
  
  private static function createAVCConfigurationBox(track:Mp4Track) {
    var avcC:mp4lib.AVCConfigurationBox;
    var NALDatabuffer:UInt8Array;
    var codecPrivateData:String;
    var NALArray:Array<String>;
    var SPS_index:Int;
    var PPS_index:Int;
    var NALBuffer:UInt8Array;
    //var tempBuffer:UInt8Array;
    var regexpSPS = new EReg("^[A-Z0-9]7", "gi"); //new RegExp("^[A-Z0-9]7", "gi");
    var regexpPPS = new EReg("^[A-Z0-9]8", "gi"); //new RegExp("^[A-Z0-9]8", "gi");

     //Create an AVC Configuration Box
     avcC = new mp4lib.AVCConfigurationBox();

     avcC.configurationVersion = 1; //unsigned int(8) configurationVersion = 1;
     avcC.lengthSizeMinusOne = 3; //indicates the length in bytes of the NALUnitLength field in an AVC video
     //sample or AVC parameter set sample of the associated stream minus one
     
     //TODO: meh?
     //avcC.reserved = 0x3F; //bit(6) reserved = ‘111111’b;

     avcC.SPS_NAL = []; //SPS NAL Array
     avcC.PPS_NAL = []; //PPS NAL Array

     NALDatabuffer = new UInt8Array(0);

     codecPrivateData = track.codecPrivateData;

     NALArray = codecPrivateData.split("00000001");

     NALArray.splice(0, 1);

     SPS_index = 0;
     PPS_index = 0;
     for (i in 0...NALArray.length) {
         NALBuffer = parseHexString(NALArray[i]);

         if (regexpSPS.match(NALArray[i])) {
             avcC.SPS_NAL[SPS_index++] = {
                 "NAL_length": NALBuffer.length,
                 "NAL": NALBuffer
             };
             
             avcC.AVCProfileIndication = parseInt(NALArray[i].substr(2, 2), 16); //contains the profile code as defined in ISO/IEC 14496-10.
             avcC.profile_compatibility = parseInt(NALArray[i].substr(4, 2), 16); //is a byte defined exactly the same as the byte which occurs between the
             //profile_IDC and level_IDC in a sequence parameter set (SPS), as defined in ISO/IEC 14496-10.
             avcC.AVCLevelIndication = parseInt(NALArray[i].substr(6, 2), 16); //contains the level code as defined in ISO/IEC 14496-10.
         }
         
         if (regexpPPS.match(NALArray[i])) {
             avcC.PPS_NAL[PPS_index++] = {
                 "NAL_length": NALBuffer.length,
                 "NAL": NALBuffer
             };
         }
     }
     avcC.numOfSequenceParameterSets = SPS_index; // number of SPSs that are used as the initial set of SPSs for decoding the AVC elementary stream.
     avcC.numOfPictureParameterSets = PPS_index; // number of PPSs that are used as the initial set of PPSs for decoding the AVC elementary stream.

     return avcC;
 }
  
  private static function doSampleSizeBox():mp4lib.SampleSizeBox {
    // This box contains the sample count and a table giving the size in bytes of each sample. This allows the media
    // data itself to be unframed. The total number of samples in the media is always indicated in the sample count.
    var stsz = new mp4lib.SampleSizeBox();

    stsz.version = 0; // default value = 0
    stsz.flags = 0; //default value = 0
    stsz.sample_count = 0; //is an integer that gives the number of samples in the track; if sample-size is 0, then it is
    //also the number of entries in the following table
    stsz.sample_size = 0; //is integer specifying the default sample size.

    return stsz;
  }
  
  private static function doChunkOffsetBox():mp4lib.ChunkOffsetBox {
     // The chunk offset table gives the index of each chunk into the containing file
     var stco = new mp4lib.ChunkOffsetBox();

     stco.version = 0; // is an integer that specifies the version of this box. default value = 0
     stco.entry_count = 0; // is an integer that gives the number of entries in the following table
     stco.flags = 0; // default value

     stco.chunk_offset = [];

     return stco;
  }
  private static function doSampleToChunkBox():mp4lib.SampleToChunkBox {
    // Samples within the media data are grouped into chunks.
    var stsc = new mp4lib.SampleToChunkBox();

    stsc.flags = 0;
    stsc.version = 0; // is an integer that specifies the version of this box. default value = 0.
    stsc.entry_count = 0; // is an integer that gives the number of entries in the following table

    stsc.entry = [];

    return stsc;

  }  
  private static function doDecodingTimeToSampleBox():mp4lib.TimeToSampleBox {
    // This box contains a compact version of a table that allows indexing from decoding time to sample number.

    var stts = new mp4lib.TimeToSampleBox();

    stts.version = 0; // is an integer that specifies the version of this box. default value = 0
    stts.entry_count = 0; // is an integer that gives the number of entries in the following table. not used in fragmented content
    stts.flags = 0; // default value = 0

    stts.entry = [];

    return stts;
  }  
    
  private static function doDataInformationBox():mp4lib.DataInformationBox {
      var dinf,
          dref,
          url;

      // The data information box contains objects that declare the location of the media information in a track.
      dinf = new mp4lib.DataInformationBox();

      // The data reference object contains a table of data references (normally URLs) that declare the location(s) of
      // the media data used within the presentation
      dref = new mp4lib.DataReferenceBox();

      dref.version = 0; // is an integer that specifies the version of this box default = 0
      dref.entry_count = 1; // is an integer that counts the actual entries
      dref.flags = 0; // default value

      // The DataEntryBox within the DataReferenceBox shall be either a DataEntryUrnBox or a DataEntryUrlBox.
      // (not used, but mandatory)
      url = new mp4lib.DataEntryUrlBox();
      url.location = "";
      url.version = 0;
      url.flags = 1;

      //add data Entry Url Box in data Reference box
      dref.boxes.push(url);

      //add data Reference Box in data information box
      dinf.boxes.push(dref);

      return dinf;
  }
  
  private static function doVideoMediaHeaderBox():mp4lib.VideoMediaHeaderBox {
    //The video media header contains general presentation information, independent of the coding, for video
    //track. Note that the flags field has the value 1.
    var vmhd = new mp4lib.VideoMediaHeaderBox();

    vmhd.version = 0; //default value, is an integer that specifies the version of this box
    vmhd.flags = 1; //default value
    vmhd.graphicsmode = 0; //specifies a composition mode for this video track, from the following enumerated set,
    //which may be extended by derived specifications: copy = 0 copy over the existing image
    vmhd.opcolor = [0x0, 0x0, 0x0]; //is a set of 3 colour values (red, green, blue) available for use by graphics modes
    //default value opcolor = {0, 0, 0};

    return vmhd;
  }
  
  private static function doSoundMediaHeaderBox():mp4lib.SoundMediaHeaderBox {
    //The sound media header contains general presentation information, independent of the coding, for audio
    //track. This header is used for all tracks containing audio
    var smhd = new mp4lib.SoundMediaHeaderBox();

    smhd.version = 0; //default value, is an integer that specifies the version of this box
    smhd.balance = 0; //is a fixed-point 8.8 number that places mono audio tracks in a stereo space; 0 is centre (the
    //normal value); full left is -1.0 and full right is 1.0.
    smhd.reserved = 0;
    smhd.flags = 1;

    return smhd;
  }
  
  public static function doHandlerReferenceBox(track:Mp4Track):mp4lib.HandlerBox {
    // This box within a Media Box declares the process by which the media-data in the track is presented, and thus,
    // the nature of the media in a track. For example, a video track would be handled by a video handler.
    var hdlr = new mp4lib.HandlerBox();

    hdlr.version = 0; // default value version = 0
    hdlr.pre_defined = 0; //default value.
    switch (track.type) {
        case 'video':
            hdlr.handler_type = stringToCharCode(mp4lib.HandlerBox.HANDLERTYPEVIDEO);
            hdlr.name = mp4lib.HandlerBox.HANDLERVIDEONAME;
        case 'audio':
            hdlr.handler_type = stringToCharCode(mp4lib.HandlerBox.HANDLERTYPEAUDIO);
            hdlr.name = mp4lib.HandlerBox.HANDLERAUDIONAME;
        default:
            hdlr.handler_type = stringToCharCode(mp4lib.HandlerBox.HANDLERTYPETEXT);
            hdlr.name = mp4lib.HandlerBox.HANDLERTEXTNAME;
    }

    hdlr.name += String.fromCharCode(0);// \0 null terminated string, seems to be also terminated in fields.StringField;
    hdlr.reserved = [0x0, 0x0, 0x0]; //default value
    hdlr.flags = 0; //default value

    return hdlr;
  }
  
  public static function doMediaHeaderBox(track:Mp4Track):mp4lib.MediaHeaderBox {

      // mdhd : The media header declares overall information that is media-independent, and relevant to characteristics of
      // the media in a track.
      var mdhd = new mp4lib.MediaHeaderBox();

      mdhd.flags = 0;
      mdhd.version = 1; // version = 1  in order to have 64bits duration value
      mdhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
      mdhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
      mdhd.timescale = track.timescale; // the time-scale for the entire presentation => take timescale of current adaptationSet
      //TODO: Bigint
      mdhd.duration = haxe.Int64.mul(track.duration, track.timescale); //integer that declares the duration of this media (in the scale of the timescale). If the
      //duration cannot be determined then duration is set to all 1s.
      mdhd.pad = 0; // padding for language value
      mdhd.language = getLanguageCode(track.language);

      mdhd.pre_defined = 0; // default value

      return mdhd;
  }
  
  private static function stringToCharCode(str:String):Int {
      var code = 0;
      for (i in 0...str.length) {
          code |= str.charCodeAt(i) << ((str.length - i - 1) * 8);
      }
      return code;
  }
  
  private static function getLanguageCode(language:String):Int {
      // Declares the language code for this track. See ISO 639-2/T for the set of three character
      // codes. Each character is packed as the difference between its ASCII value and 0x60. Since the code
      // is confined to being three lower-case letters, these values are strictly positive.
      var firstLetterCode:Int;
      var secondLetterCode:Int;
      var thirdLetterCode:Int;
      var result = 0;

      // If lang member is define, get it. if not language is 'und'
      // If current adaptation is video type, return 'und'.
      // var language = adaptation.lang ? adaptation.lang : 'und' ;

      // Return value is packed on 15 bits, each character is defined on 5 bits
      // there is a padding value to align on 16 bits
      firstLetterCode = (language.charCodeAt(0) - 96) << 10; //96 decimal base = 0x60
      secondLetterCode = (language.charCodeAt(1) - 96) << 5;
      thirdLetterCode = language.charCodeAt(2) - 96;

      result = firstLetterCode | secondLetterCode | thirdLetterCode;

      return result;
  }
  
  private static function parseInt(stringValue:String, radix:Int):Int {
		if (stringValue.substr(0, 1) == '-') return - parseInt(stringValue.substr(1), radix);
		
		var value:Int = 0;
		
		for (n in 0 ... stringValue.length) {
			var charCode:Int = stringValue.charCodeAt(n);
			
			value *= radix;
			
			if (charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0)) {
				value += (charCode - '0'.charCodeAt(0)) + 0;
			} else if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) {
				value += (charCode - 'a'.charCodeAt(0)) + 10;
			} else if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
				value += (charCode - 'A'.charCodeAt(0)) + 10;
			}
		}
		
		return value;
	}
  
  private static var base16_decoder:haxe.crypto.BaseCode = new haxe.crypto.BaseCode(haxe.io.Bytes.ofString("0123456789abcdef"));
  private static function parseHexString(str:String):UInt8Array 
      return UInt8Array.fromBytes(base16_decoder.decodeBytes(haxe.io.Bytes.ofString(str.toLowerCase())));
      /*
      var buf = new haxe.io.BytesBuffer();
      while (str.length >= 2) {
          buf.addByte(parseInt(str.substring(0, 2), 16));
          str = str.substring(2, str.length);
      }

      return UInt8Array.fromBytes(buf.getBytes());
      */
  
  /*
  private static function hexstringtoBuffer(a:String):UInt8Array {
      var l = Math.floor(a.length/2);
      var res = new UInt8Array(l);

      for (i in 0...l) {
          res[i] = parseInt("" + a.substr(i * 2, 1) + a.substr(i * 2 + 1, 1), 16);
      }
      return res;
  }
  */
  
  public static function searchBox(boxtype:String, uuid:String):Class<Dynamic>{
        var boxType;

        if (uuid != null) {
            boxType = boxTypeArray[uuid];
        }
        else {
            boxType = boxTypeArray[boxtype];
        }
        
        if (!boxType){
            boxType = mp4lib.UnknownBox;
        }
        
        return boxType;
    };
    
  public static function createBox(boxtype:String,size:Int, uuid:String):mp4lib.Box {
      return cast Type.createInstance(searchBox(boxtype, uuid), [size]);
  }
  /**
   * deserialize binary data (uint8array) into mp4lib.File object
   **/
  public static function deserialize(data:UInt8Array):mp4lib.File {
    var f = new mp4lib.File();
    try{
        f.read(data);
    }catch(e:Dynamic){
        throw e;
        f = null;
    }
    return f;
  }
  #if standalone
  public static function main(){}
  #end
  /**
   *  serialize box (or mp4lib.File) into binary data (uint8array)
   **/
  public static function serialize(atom:mp4lib.fields.IField<Dynamic>):UInt8Array{
        var retval = new UInt8Array(atom.getLength());
        atom.write(retval, null, null);
        return retval;
  };
}

class Mp4Track{
    public var type :String = 'und';
    public var trackId :Int = 0;
    public var timescale :Int = 0;
    public var duration :Int = 0;
    public var codecs :String = "";
    public var codecPrivateData :String = "";
    public var bandwidth :Int = 0;
    public var width :Int = 0;
    public var height :Int = 0;
    public var language :String = 'und';
    public var channels:Int = 0;
    public var samplingRate:Int = 0;
    public var contentProtection:Dynamic = null;
    public var samples:Array<Mp4TrackSample> = [];
    public var data:UInt8Array = null;
    public function new(){};
}

class Mp4TrackSample { //MediaPlayer.vo.Mp4Track
    public var dts:Int = 0;
    public var cts:Int = 0;
    public var duration:Int = 0;
    public var flags:Int = 0;
    public var data:UInt8Array = null;
    public var size:Int = 0;
    public function new(){};
}
