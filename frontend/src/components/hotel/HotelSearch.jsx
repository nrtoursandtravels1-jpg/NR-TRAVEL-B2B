export default function HotelSearch({
  search,
  setSearch,
}) {
  return (
    <div className="mb-6">

      <HotelSearch
  search={search}
  setSearch={setSearch}
/>

<HotelTable
  refresh={refresh}
  search={search}
  setSelectedHotel={handleEditHotel}
/>
    </div>
  );
}