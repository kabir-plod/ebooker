export default class DateUtil {
	
	private static pad(number) {
		if (number < 10) {
			return '0' + number;
		}
		return number;
	}

	// CCYY-MM-DDThh:mm:ssZ
	public static getDateString(): string {
		const date = new Date();
		
		return date.getUTCFullYear() +
		'-' + this.pad(date.getUTCMonth() + 1) +
		'-' + this.pad(date.getUTCDate()) +
		'T' + this.pad(date.getUTCHours()) +
		':' + this.pad(date.getUTCMinutes()) +
		':' + this.pad(date.getUTCSeconds()) +
		'Z';
	}
}