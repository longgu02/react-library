import "bootstrap/dist/css/bootstrap.min.css";

export default function ({ data, render }) {
  return (
    <div>
      <row>{data.map((item) => render(item))}</row>
    </div>
  );
}
