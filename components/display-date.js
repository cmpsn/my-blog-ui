const DisplayDate = ({ createdDateISO, updatedDateISO }) => {
  // Date must be in ISO format (2021-09-16T20:00:00Z)
  // Transform date in Ro format for display
  const intlDateObjRo = new Intl.DateTimeFormat('ro-RO', {year: 'numeric', month: 'long', day:'2-digit'});
  const createdDateRo = intlDateObjRo.format(new Date(createdDateISO));
  const updatedDateRo = intlDateObjRo.format(new Date(updatedDateISO));

  // Split year,month,day from 2004-09-16T00:00:00Z format
  const createdDateWithDash = createdDateISO.split('T')[0];
  const updatedDateWithDash = updatedDateISO.split('T')[0];

  // Create Date from splitted strings and compare date values.
  if (new Date(createdDateWithDash).valueOf() < new Date(updatedDateWithDash).valueOf()) {
    return (
      <>
        <p className="mb-2">
          <span>Publicat la </span>
          <time dateTime={`${createdDateWithDash}`} className="font-bold">
            {createdDateRo}
          </time>
        </p>

        <span className="mb-2">
          <span> Actualizat la </span>
          <time dateTime={`${updatedDateWithDash}`} className="font-bold">
            {updatedDateRo}
          </time>
        </span>
      </>
    );
  }
  else {
    return (
        <p className="mb-2">
          <span>Publicat la </span>
          <time dateTime={`${createdDateWithDash}`} className="font-bold">
            {createdDateRo}
          </time>
        </p>
    );
  }
};

export default DisplayDate;