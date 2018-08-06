package mp4lib;
import haxe.io.UInt8Array;

typedef Sample_struct = {
  var sample_duration:Null<haxe.Int32>;
  var sample_size:Null<haxe.Int32>;
  var sample_flags:Null<haxe.Int32>;
  var sample_composition_time_offset:Null<haxe.Int32>;
}

class TrackFragmentRunBox extends FullBox{
  public var sample_count:Null<haxe.Int32> = null;
  public var data_offset:Null<haxe.Int32> = null;
  public var first_sample_flags:Null<haxe.Int32> = null;
  public var samples_table:Array<Sample_struct>;
  
  public function new(?size:Int = null) {
    super('trun', size);
  }
  
  override public function computeLength() {
    super.computeLength();

    this.size += Fields.FIELD_UINT32.getLength(); //sample_count size
    if ((this.flags & 0x000001) != 0 && this.data_offset != null) {
        this.size += Fields.FIELD_INT32.getLength();
    }
    if ((this.flags & 0x000004) != 0 && this.first_sample_flags != null) {
        this.size += Fields.FIELD_UINT32.getLength();
    }

    for (i in 0...this.sample_count) {
        if ((this.flags & 0x000100) != 0 && this.samples_table[i].sample_duration != null) {
            this.size += Fields.FIELD_UINT32.getLength();
        }
        if ((this.flags & 0x000200) != 0 && this.samples_table[i].sample_size != null) {
            this.size += Fields.FIELD_UINT32.getLength();
        }
        if ((this.flags & 0x000400) != 0 && this.samples_table[i].sample_flags != null) {
            this.size += Fields.FIELD_UINT32.getLength();
        }

        if (this.version == 1) {
            if ((this.flags & 0x000800) != 0 && this.samples_table[i].sample_composition_time_offset != null) {
                this.size += Fields.FIELD_INT32.getLength();
            }
        } else {
            if ((this.flags & 0x000800) != 0 && this.samples_table[i].sample_composition_time_offset != null) {
                this.size += Fields.FIELD_UINT32.getLength();
            }
        }
    }
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.sample_count);

    if ((this.flags & 0x000001) != 0) {
        this._writeData(data, Fields.FIELD_INT32, this.data_offset);
    }
    if ((this.flags & 0x000004) != 0) {
        this._writeData(data, Fields.FIELD_UINT32, this.first_sample_flags);
    }

    for (i in 0...this.sample_count) {

        if ((this.flags & 0x000100) != 0) {
            this._writeData(data, Fields.FIELD_UINT32, this.samples_table[i].sample_duration);
        }
        if ((this.flags & 0x000200) != 0) {
            this._writeData(data, Fields.FIELD_UINT32, this.samples_table[i].sample_size);
        }
        if ((this.flags & 0x000400) != 0) {
            this._writeData(data, Fields.FIELD_UINT32, this.samples_table[i].sample_flags);
        }

        if (this.version == 1) {
            if ((this.flags & 0x000800) != 0) {
                this._writeData(data, Fields.FIELD_INT32, this.samples_table[i].sample_composition_time_offset);
            }
        } else {
            if ((this.flags & 0x000800) != 0) {
                this._writeData(data, Fields.FIELD_UINT32, this.samples_table[i].sample_composition_time_offset);
            }
        }
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    this.sample_count = this._readData(data, Fields.FIELD_UINT32);

    if ((this.flags & 0x000001) != 0) {
        this.data_offset = this._readData(data, Fields.FIELD_INT32);
    }
    if ((this.flags & 0x000004) != 0) {
        this.first_sample_flags = this._readData(data, Fields.FIELD_UINT32);
    }

    this.samples_table = [];

    for (i in 0...this.sample_count) {
        var struct = {
          sample_duration:null,
          sample_size:null,
          sample_flags:null,
          sample_composition_time_offset:null
        }
        if ((this.flags & 0x000100) != 0) {
            struct.sample_duration = this._readData(data, Fields.FIELD_UINT32);
        }
        if ((this.flags & 0x000200) != 0) {
            struct.sample_size = this._readData(data, Fields.FIELD_UINT32);
        }
        if ((this.flags & 0x000400) != 0) {
            struct.sample_flags = this._readData(data, Fields.FIELD_UINT32);
        }

        if (this.version == 1) {
            if ((this.flags & 0x000800) != 0) {
                struct.sample_composition_time_offset = this._readData(data, Fields.FIELD_INT32);
            }
        } else {
            if ((this.flags & 0x000800) != 0) {
                struct.sample_composition_time_offset = this._readData(data, Fields.FIELD_UINT32);
            }
        }
        this.samples_table.push(struct);
    }
    return this.localPos;
  }
}
