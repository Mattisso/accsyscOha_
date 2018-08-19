
var otableaupostedata = [
	{
		"tblRefCode": "BZ",
		"Description": "Total General ( I +  II +  III +  IV)",
		"TableauName": "tblActif",
		"tableauLongName": "Bilan Actif",
		"ostableaupostes": [
			{ "StableauName": "tblAmortImmo" },
			{
				"StableauName": "tblBilanActif"
			},
			{
				"StableauName": "tblProvision"
			}
		]

	},
	{
		"tblRefCode": "ST",
		"Description": "Total General des Charges",
		"TableauName": "tblCharges",
		"tableauLongName": "Résultat Charges",
		"ostableaupostes": [{ "StableauName": "tblResultChrges" }]

	},
	{
		"tblRefCode": "TI",
		"Description": "Chiffre d' Affaires  (TA+TC+TD+TH)",
		"TableauName": "tblChifAffair",
		"tableauLongName": "Chiffre d'Affair",
		"ostableaupostes": [{ "StableauName": "tblChifAffair" }]

	},
	{
		"tblRefCode": "DZ",
		"Description": "Total General (I+ II+ III+ IV+ V)",
		"TableauName": "tblPassif",
		"tableauLongName": "Bilan Passif",
		"ostableaupostes": [{ "StableauName": "tblBilanPassif" }]

	},
	{
		"tblRefCode": "UT",
		"Description": "Total General des Produits",
		"TableauName": "tblProduidts",
		"tableauLongName": "Résultat Produits",
		"ostableaupostes": [{ "StableauName": "tblResultPrdts" }]

	},
	{
		"tblRefCode": "UZ",
		"Description": "Résultat Net",
		"TableauName": "tblResultat",
		"tableauLongName": "Résultat",
		"ostableaupostes": [{ "StableauName": "tblResultat" }]

	}
]
module.exports = otableaupostedata;