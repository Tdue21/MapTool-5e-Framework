const string characterPath = @"c:\Users\thdue\Downloads\dnd\";
const string characterName = "Max";


var propNames = File.ReadAllLines(Path.Combine(characterPath, characterName, "property", "prop_file_map.txt"));
var props = propNames
		.Select(x => x.Split(" => "))
		.Where(x => !string.IsNullOrEmpty(x[1]))
		.Select( items => new { Key = items[1], Value = File.ReadAllText(Path.Combine(characterPath, characterName, "property", items[0]))})		
		.ToDictionary(x => x.Key, x => x.Value);

var jsonObject = new Dictionary<string, object>();
foreach(var item in props)
{
	if(IsJsonValid(item.Value))
	{
		jsonObject.Add(item.Key, JsonConvert.DeserializeObject((string)item.Value));
	}
	else
	{
		jsonObject.Add(item.Key, item.Value);
	}
}

var characterData = JsonConvert.SerializeObject(jsonObject, new JsonSerializerSettings { Formatting = Newtonsoft.Json.Formatting.Indented });

using var fileStream = File.OpenWrite(Path.Combine(characterPath, characterName + ".json"));
using var writer = new JsonTextWriter(new StreamWriter(fileStream));




characterData.Dump();


bool IsJsonValid(string json) 
{
	if(string.IsNullOrWhiteSpace(json)) return false;
	
	try
	{	        
		using var jDoc = JsonDocument.Parse(json);
		return true;
	}
	catch (System.Text.Json.JsonException)
	{
		return false;
	}
}