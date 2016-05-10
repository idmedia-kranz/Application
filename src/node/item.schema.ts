// create a schema
var itemSchema = new Schema({
  type: String,
  position: { x: Number, y: Number },
  created_at: Date,
  updated_at: Date
});

itemSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Item = mongoose.model('Item', itemSchema);

/*
var newItem = Item({
			type: 'koffer', 
			position: { x: 0, y: 0 }
		});
		
newItem.save(function(err) {
  if (err) throw err;

  console.log('Item created!');
});
*/