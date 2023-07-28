export function Pagination({
	page,
	setPage,
	numOfPages,
}: {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	numOfPages: number;
}) {
	return (
		<div>
			<div className=" flex justify-center items-center bg-fuchsia-900 w-fit m-auto p-2 px-4 rounded-2xl bg-opacity-70">
				<button
					disabled={page === 1}
					onClick={() => setPage((value) => value - 1)}
					className="select-none disabled:opacity-50 text-xl text-white flex hover:scale-150  disabled:pointer-events-none"
				>{`<`}</button>
				<p className="text-white rounded-full bg-fuchsia-950 p-2 px-4 w-24 text-center mx-4 select-none">
					Page {page}
				</p>
				<button
					disabled={page === numOfPages}
					onClick={() => setPage((value) => value + 1)}
					className="select-none disabled:opacity-50 text-xl text-white flex hover:scale-150  disabled:pointer-events-none"
				>{`>`}</button>
			</div>
		</div>
	);
}
