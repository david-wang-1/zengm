import { load } from "cheerio";
import fs from "fs";
import path from "path";

// Scrape all https://www.basketball-reference.com/friv/colleges.fcgi?college=acadia
const folder = "/media/external/BBGM/basketball-colleges/html";

// All D-1 colleges, taken from https://www.ncaa.com/standings/basketball-men/d1
const colleges = {
	"Abilene Christian": undefined,
	"Air Force": undefined,
	Akron: undefined,
	Alabama: undefined,
	"Alabama A&M": undefined,
	"Alabama State": undefined,
	Albany: undefined,
	"Alcorn State": undefined,
	"American University": undefined,
	"Appalachian State": undefined,
	Arizona: undefined,
	"Arizona State": undefined,
	Arkansas: undefined,
	"Arkansas State": undefined,
	"Arkansas-Little Rock": undefined,
	"Arkansas-Pine Bluff": undefined,
	Army: undefined,
	Auburn: undefined,
	"Austin Peay": undefined,
	"Ball State": undefined,
	Baylor: undefined,
	Belmont: undefined,
	"Bethune-Cookman": undefined,
	Binghamton: undefined,
	"Boise State": undefined,
	"Boston College": undefined,
	"Boston University": undefined,
	"Bowling Green": undefined,
	Bradley: undefined,
	Brown: undefined,
	"Bryant University": undefined,
	Bucknell: undefined,
	Buffalo: undefined,
	Butler: undefined,
	BYU: undefined,
	"Cal Poly": undefined,
	"Cal State Bakersfield": undefined,
	"Cal State Fullerton": undefined,
	"Cal State Northridge": undefined,
	California: undefined,
	"California Baptist": undefined,
	Campbell: undefined,
	Canisius: undefined,
	"Central Arkansas": undefined,
	"Central Connecticut State": undefined,
	"Central Michigan": undefined,
	Charleston: undefined,
	"Charleston Southern": undefined,
	Charlotte: undefined,
	Chattanooga: undefined,
	"Chicago State": undefined,
	Cincinnati: undefined,
	Citadel: undefined,
	Clemson: undefined,
	"Cleveland State": undefined,
	"Coastal Carolina": undefined,
	Colgate: undefined,
	Colorado: undefined,
	"Colorado State": undefined,
	Columbia: undefined,
	Connecticut: undefined,
	"Coppin State": undefined,
	Cornell: undefined,
	Creighton: undefined,
	Dartmouth: undefined,
	Davidson: undefined,
	Dayton: undefined,
	Delaware: undefined,
	"Delaware State": undefined,
	Denver: undefined,
	DePaul: undefined,
	"Detroit Mercy": undefined,
	Drake: undefined,
	Drexel: undefined,
	Duke: undefined,
	Duquesne: undefined,
	"East Carolina": undefined,
	"East Tennessee State": undefined,
	"Eastern Illinois": undefined,
	"Eastern Kentucky": undefined,
	"Eastern Michigan": undefined,
	"Eastern Washington": undefined,
	Elon: undefined,
	Evansville: undefined,
	Fairfield: undefined,
	"Fairleigh Dickinson": undefined,
	Florida: undefined,
	"Florida A&M": undefined,
	"Florida Atlantic": undefined,
	"Florida Gulf Coast": undefined,
	"Florida International": undefined,
	"Florida State": undefined,
	Fordham: undefined,
	"Fresno State": undefined,
	Furman: undefined,
	"Gardner-Webb": undefined,
	"George Mason": undefined,
	"George Washington": undefined,
	Georgetown: undefined,
	Georgia: undefined,
	"Georgia Southern": undefined,
	"Georgia State": undefined,
	"Georgia Tech": undefined,
	Gonzaga: undefined,
	"Grambling State": undefined,
	"Grand Canyon": undefined,
	"Green Bay": undefined,
	Hampton: undefined,
	Hartford: undefined,
	Harvard: undefined,
	Hawaii: undefined,
	"High Point": undefined,
	Hofstra: undefined,
	"Holy Cross": undefined,
	Houston: undefined,
	"Houston Baptist": undefined,
	Howard: undefined,
	Idaho: undefined,
	"Idaho State": undefined,
	Illinois: undefined,
	"Illinois State": undefined,
	"Illinois-Chicago": undefined,
	"Incarnate Word": undefined,
	Indiana: undefined,
	"Indiana State": undefined,
	Iona: undefined,
	Iowa: undefined,
	"Iowa State": undefined,
	IUPUI: undefined,
	"Jackson State": undefined,
	Jacksonville: undefined,
	"Jacksonville State": undefined,
	"James Madison": undefined,
	Kansas: undefined,
	"Kansas City": undefined,
	"Kansas State": undefined,
	"Kennesaw State": undefined,
	"Kent State": undefined,
	Kentucky: undefined,
	"La Salle": undefined,
	Lafayette: undefined,
	Lamar: undefined,
	Lehigh: undefined,
	Liberty: undefined,
	Lipscomb: undefined,
	LIU: undefined,
	"Long Beach State": undefined,
	Longwood: undefined,
	"Louisiana Tech": undefined,
	"Louisiana-Lafayette": undefined,
	"Louisiana-Monroe": undefined,
	Louisville: undefined,
	"Loyola (MD)": undefined,
	"Loyola Chicago": undefined,
	"Loyola Marymount": undefined,
	LSU: undefined,
	Maine: undefined,
	Manhattan: undefined,
	Marist: undefined,
	Marquette: undefined,
	Marshall: undefined,
	Maryland: undefined,
	"Maryland-Eastern Shore": undefined,
	Massachusetts: undefined,
	"Massachusetts-Lowell": undefined,
	"McNeese State": undefined,
	Memphis: undefined,
	Mercer: undefined,
	Merrimack: undefined,
	"Miami (FL)": undefined,
	"Miami (OH)": undefined,
	Michigan: undefined,
	"Michigan State": undefined,
	"Middle Tennessee": undefined,
	Milwaukee: undefined,
	Minnesota: undefined,
	"Mississippi State": undefined,
	"Mississippi Valley State": undefined,
	Missouri: undefined,
	"Missouri State": undefined,
	Monmouth: undefined,
	Montana: undefined,
	"Montana State": undefined,
	"Morehead State": undefined,
	"Morgan State": undefined,
	"Mount St. Mary's": undefined,
	"Murray State": undefined,
	"N.J.I.T.": undefined,
	Navy: undefined,
	Nebraska: undefined,
	"Nebraska-Omaha": undefined,
	Nevada: undefined,
	"New Hampshire": undefined,
	"New Mexico": undefined,
	"New Mexico State": undefined,
	"New Orleans": undefined,
	Niagara: undefined,
	"Nicholls State": undefined,
	"Norfolk State": undefined,
	"North Alabama": undefined,
	"North Carolina": undefined,
	"North Carolina A&T": undefined,
	"North Carolina Central": undefined,
	"North Carolina State": undefined,
	"North Carolina-Wilmington": undefined,
	"North Dakota": undefined,
	"North Dakota State": undefined,
	"North Florida": undefined,
	"North Texas": undefined,
	Northeastern: undefined,
	"Northern Arizona": undefined,
	"Northern Colorado": undefined,
	"Northern Illinois": undefined,
	"Northern Iowa": undefined,
	"Northern Kentucky": undefined,
	Northwestern: undefined,
	"Northwestern State": undefined,
	"Notre Dame": undefined,
	Oakland: undefined,
	Ohio: undefined,
	"Ohio State": undefined,
	Oklahoma: undefined,
	"Oklahoma State": undefined,
	"Old Dominion": undefined,
	"Ole Miss": undefined,
	"Oral Roberts": undefined,
	Oregon: undefined,
	"Oregon State": undefined,
	Pacific: undefined,
	"Penn State": undefined,
	Pennsylvania: undefined,
	Pepperdine: undefined,
	Pittsburgh: undefined,
	Portland: undefined,
	"Portland State": undefined,
	"Prairie View A&M": undefined,
	Presbyterian: undefined,
	Princeton: undefined,
	Providence: undefined,
	Purdue: undefined,
	"Purdue Fort Wayne": undefined,
	Quinnipiac: undefined,
	Radford: undefined,
	"Rhode Island": undefined,
	Rice: undefined,
	Richmond: undefined,
	Rider: undefined,
	"Robert Morris": undefined,
	Rutgers: undefined,
	"Sacramento State": undefined,
	"Sacred Heart": undefined,
	"Saint Joseph's (PA)": undefined,
	"Saint Louis": undefined,
	"Saint Mary's": undefined,
	"Sam Houston State": undefined,
	Samford: undefined,
	"San Diego": undefined,
	"San Diego State": undefined,
	"San Francisco": undefined,
	"San Jose State": undefined,
	"Santa Clara": undefined,
	Seattle: undefined,
	"Seton Hall": undefined,
	Siena: undefined,
	"SIU-Edwardsville": undefined,
	SMU: undefined,
	"South Alabama": undefined,
	"South Carolina": undefined,
	"South Carolina State": undefined,
	"South Dakota": undefined,
	"South Dakota State": undefined,
	"South Florida": undefined,
	"Southeast Missouri State": undefined,
	"Southeastern Louisiana": undefined,
	"Southern Illinois": undefined,
	"Southern Miss": undefined,
	"Southern University": undefined,
	"Southern Utah": undefined,
	"St. Bonaventure": undefined,
	"St. Francis (BKN)": undefined,
	"St. Francis (PA)": undefined,
	"St. John's": undefined,
	"St. Peter's": undefined,
	Stanford: undefined,
	"Stephen F. Austin": undefined,
	Stetson: undefined,
	"Stony Brook": undefined,
	Syracuse: undefined,
	TCU: undefined,
	Temple: undefined,
	Tennessee: undefined,
	"Tennessee State": undefined,
	"Tennessee Tech": undefined,
	"Tennessee-Martin": undefined,
	Texas: undefined,
	"Texas A&M": undefined,
	"Texas A&M-CC": undefined,
	"Texas Rio Grande Valley": undefined,
	"Texas Southern": undefined,
	"Texas State": undefined,
	"Texas Tech": undefined,
	"Texas-Arlington": undefined,
	Toledo: undefined,
	Towson: undefined,
	Troy: undefined,
	Tulane: undefined,
	Tulsa: undefined,
	UAB: undefined,
	"UC Davis": undefined,
	"UC Irvine": undefined,
	"UC Riverside": undefined,
	"UC Santa Barbara": undefined,
	UCF: undefined,
	UCLA: undefined,
	UMBC: undefined,
	"UNC Asheville": undefined,
	"UNC Greensboro": undefined,
	UNLV: undefined,
	USC: undefined,
	"USC Upstate": undefined,
	Utah: undefined,
	"Utah State": undefined,
	"Utah Valley": undefined,
	UTEP: undefined,
	UTSA: undefined,
	Valparaiso: undefined,
	Vanderbilt: undefined,
	Vermont: undefined,
	Villanova: undefined,
	Virginia: undefined,
	"Virginia Commonwealth": undefined,
	"Virginia Military": undefined,
	"Virginia Tech": undefined,
	Wagner: undefined,
	"Wake Forest": undefined,
	Washington: undefined,
	"Washington State": undefined,
	"Weber State": undefined,
	"West Virginia": undefined,
	"Western Carolina": undefined,
	"Western Illinois": undefined,
	"Western Kentucky": undefined,
	"Western Michigan": undefined,
	"Wichita State": undefined,
	"William & Mary": undefined,
	Winthrop: undefined,
	Wisconsin: undefined,
	Wofford: undefined,
	"Wright State": undefined,
	Wyoming: undefined,
	Xavier: undefined,
	Yale: undefined,
	"Youngstown State": undefined,
};

// Colleges with no players
const skip = [
	"Abilene Christian",
	"Army",
	"Binghamton",
	"Bryant University",
	"California Baptist",
	"Charleston Southern",
	"Chicago State",
	"Citadel",
	"Coastal Carolina",
	"Delaware",
	"Fairleigh Dickinson",
	"Florida Atlantic",
	"Incarnate Word",
	"Kennesaw State",
	"Lafayette",
	"Massachusetts-Lowell",
	"Merrimack",
	"Miami (OH)",
	"Milwaukee",
	"N.J.I.T.",
	"Nebraska-Omaha",
	"New Hampshire",
	"North Alabama",
	"North Dakota State",
	"North Florida",
	"Northern Iowa",
	"Northern Kentucky",
	"Presbyterian",
	"Quinnipiac",
	"Sacramento State",
	"Sacred Heart",
	"Samford",
	"SIU-Edwardsville",
	"Southeastern Louisiana",
	"Southern Utah",
	"Texas A&M-CC",
	"Texas Rio Grande Valley",
	"Troy",
	"UC Davis",
	"UMBC",
	"UNC Asheville",
	"UNC Greensboro",
	"Vermont",
	"Wagner",
	"Winthrop",
	"Youngstown State",
];
for (const college of skip) {
	if (!Object.hasOwn(colleges, college)) {
		console.log("INVALID SKIP", college);
	}
	colleges[college] = 0.1;
}

const overrides = {
	"United States Air Force Academy": "Air Force",
	"Albany State University": "Albany",
	"Little Rock": "Arkansas-Little Rock",
	"University of Arkansas at Pine Bluff": "Arkansas-Pine Bluff",
	"Austin Peay State University": "Austin Peay",
	"UNC Charlotte": "Charlotte",
	UConn: "Connecticut",
	"University of Illinois at Chicago": "Illinois-Chicago",
	"University of Missouri-Kansas City": "Kansas City",
	"Long Island University": "LIU",
	"Cal State Long Beach": "Long Beach State",
	"LA-Lafayette": "Louisiana-Lafayette",
	"University of Louisiana at Monroe": "Louisiana-Monroe",
	"Loyola College in Maryland": "Loyola (MD)",
	"University of Maryland Eastern Shore": "Maryland-Eastern Shore",
	UMass: "Massachusetts",
	"Middle Tennessee State University": "Middle Tennessee",
	"United States Naval Academy": "Navy",
	UNC: "North Carolina",
	"NC Central": "North Carolina Central",
	"NC State": "North Carolina State",
	"UNC Wilmington": "North Carolina-Wilmington",
	"University of the Pacific": "Pacific",
	Pitt: "Pittsburgh",
	"Purdue-Fort Wayne": "Purdue Fort Wayne",
	"Robert Morris University (IL)": "Robert Morris",
	"Saint Joseph's": "Saint Joseph's (PA)",
	"SE Missouri State": "Southeast Missouri State",
	"University of Southern Mississippi": "Southern Miss",
	"Southern University and A&M College": "Southern University",
	"St. Francis College": "St. Francis (BKN)",
	"Saint Francis University": "St. Francis (PA)",
	"Saint Peter's College": "St. Peter's",
	"Tennessee Technological University": "Tennessee Tech",
	"University of Tennessee at Martin": "Tennessee-Martin",
	"UT Arlington": "Texas-Arlington",
	"University of Alabama at Birmingham": "UAB",
	"Central Florida": "UCF",
	"Utah Valley State College": "Utah Valley",
	"Texas-El Paso": "UTEP",
	"University of Texas at San Antonio": "UTSA",
	"Virginia Military Institute": "Virginia Military",
	"College of William & Mary": "William & Mary",
};

// Get player info from files
for (const filename of fs.readdirSync(folder)) {
	const file = path.join(folder, filename);
	const contents = fs.readFileSync(file, "utf8");

	const $ = load(contents);
	let name = $("title")
		.text()
		.replace("NBA & ABA Players Who Attended ", "")
		.replace(" | Basketball-Reference.com", "");
	const count = parseInt($("#players_link").attr("data-label"));

	// Actually the same school
	if (name === "Missouri State University") {
		name = "Missouri State";
	}

	const names = [name];
	if (overrides[name]) {
		names.push(overrides[name]);
	}
	if (name.includes(" University")) {
		names.push(name.replace(" University", ""));
	}
	if (name.includes("University of ")) {
		names.push(name.replace("University of ", ""));
	}
	if (name.includes(" College") && name !== "Howard College") {
		names.push(name.replace(" College", ""));
	}
	if (name.includes("California State University, ")) {
		names.push(name.replace("California State University, ", "Cal State "));
	}
	if (name.includes("University of California, ")) {
		names.push(name.replace("University of California, ", "UC "));
	}

	for (const name2 of names) {
		if (colleges[name2] !== undefined) {
			// Missouri State University and Missouri State are the same school, so add them
			if (name2 === "Missouri State") {
				colleges[name2] += count;
			} else {
				console.log("DUPE", name2);
			}
		} else {
			colleges[name2] = count;
		}
	}
}

for (const [college, count] of Object.entries(colleges)) {
	if (count === undefined) {
		console.log("UNKNOWN", college);
	}
}

// Easter egg
colleges["South Central Louisiana State University"] = 0.01;

console.log(colleges);
