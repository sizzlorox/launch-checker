
const dataNotToMap = [
  'id',
  'name',
  'type',
  'launch',
];

function Description({
  data,
}) {
  return (
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Payload
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {data.type}
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          {
            Object.entries(data).map(([key, value]) => {
              let data = value;
              if (dataNotToMap.includes(key)) return null;
              if (value === null) return value;
              if (Array.isArray(value)) {
                if (!value.length) return null;
                data = value.join(', ');
              }
              if (key === 'dragon') return null;
              if (typeof data === 'boolean') {
                data = data.toString();
              }

              return (
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    {key}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data}
                  </dd>
                </div>
              );
            })
          }
        </dl>
      </div>
    </div>
  );
};
export default Description;
