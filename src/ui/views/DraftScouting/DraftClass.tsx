import { useState } from "react";
import { DataTable, LeagueFileUpload } from "../../components";
import { downloadFile, getCols, toWorker } from "../../util";
import type { View } from "../../../common/types";
import { WEBSITE_ROOT } from "../../../common";
import { wrappedPlayerNameLabels } from "../../components/PlayerNameLabels";
import type { DataTableRow } from "../../components/DataTable";

const DraftClass = ({
	challengeNoRatings,
	fantasyDraft,
	godMode,
	offset,
	players,
	season,
}: {
	challengeNoRatings: boolean;
	fantasyDraft: boolean;
	godMode: boolean;
	offset: number;
	players: View<"draftScouting">["seasons"][0]["players"];
	season: number;
}) => {
	const [showImportForm, setShowImportForm] = useState(false);
	const [status, setStatus] = useState<"exporting" | "loading" | undefined>();

	const cols = getCols(["#", "Name", "Pos", "Age", "Ovr", "Pot"]);

	const rows: DataTableRow[] = players.map((p) => {
		return {
			key: p.pid,
			metadata: {
				type: "player",
				pid: p.pid,
				season,
				playoffs: "regularSeason",
			},
			data: [
				p.rank,
				wrappedPlayerNameLabels({
					pid: p.pid,
					season,
					skills: p.skills,
					watch: p.watch,
					firstName: p.firstNameShort,
					firstNameShort: p.firstNameShort,
					lastName: p.lastName,
				}),
				p.pos,
				p.age,
				!challengeNoRatings ? p.ovr : null,
				!challengeNoRatings ? p.pot : null,
			],
		};
	});

	return (
		<>
			<h2>{season}</h2>

			{fantasyDraft ? (
				<div className="mb-3 text-warning">
					You cannot import/export future draft classes during a fantasy draft
				</div>
			) : (
				<div className="d-flex flex-wrap gap-1 mb-3">
					<div className="btn-group me-auto">
						<button
							className="btn btn-light-bordered btn-xs"
							onClick={() => setShowImportForm((val) => !val)}
						>
							Import
						</button>
						<button
							className="btn btn-light-bordered btn-xs"
							disabled={status === "exporting" || status === "loading"}
							onClick={async () => {
								setStatus("exporting");

								const { filename, json } = await toWorker(
									"main",
									"exportDraftClass",
									{ season },
								);
								downloadFile(filename, json, "application/json");

								setStatus(undefined);
							}}
						>
							Export
						</button>
						{godMode ? (
							<button
								className="btn btn-outline-god-mode btn-xs"
								disabled={status === "exporting" || status === "loading"}
								onClick={async () => {
									setStatus("loading");

									await toWorker("main", "regenerateDraftClass", season);

									setStatus(undefined);
								}}
							>
								Regenerate
							</button>
						) : null}
					</div>
				</div>
			)}

			{showImportForm ? (
				<div>
					<p>
						To replace this draft class with players from a{" "}
						<a
							href={`https://${WEBSITE_ROOT}/manual/customization/draft-class/`}
							rel="noopener noreferrer"
							target="_blank"
						>
							custom draft class file
						</a>
						, select the file below.
					</p>
					<LeagueFileUpload
						disabled={status === "exporting"}
						includePlayersInBasicInfo
						onLoading={() => {
							setStatus("loading");
						}}
						onDone={async (error, output) => {
							if (error || !output) {
								return;
							}

							await toWorker("main", "handleUploadedDraftClass", {
								uploadedFile: output.basicInfo,
								draftYear: season,
							});

							setShowImportForm(false);
							setStatus(undefined);
						}}
					/>
					<p />
				</div>
			) : null}

			<DataTable
				cols={cols}
				defaultSort={[0, "asc"]}
				name={`DraftScouting:${offset}`}
				rows={rows}
			/>
		</>
	);
};

export default DraftClass;
