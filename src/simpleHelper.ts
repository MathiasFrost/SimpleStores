const ISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3}Z?)?$/;

/** Useful functions for handling dates */
export class SimpleHelper
{
	/** Detect any JSON date strings in JSON string and initialize them with new Date() */
	static initializeDates(json: any)
	{
		if (!json)
		{
			return;
		}
		const keys = Object.keys(json);
		for (const key of keys)
		{
			// Check if JSON date string
			if (typeof json[key] === "string" && json[key].match(ISO8601))
			{
				json[key] = new Date(json[key]);
			}
			
			// Check if object
			else if (typeof json[key] === "object")
			{
				this.initializeDates(json[key]);
			}
			
			// Check if array
			else if (Array.isArray(json[key]))
			{
				for (const element of json[key])
				{
					this.initializeDates(element);
				}
			}
		}
	}
}
