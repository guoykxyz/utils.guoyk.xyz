export const useUtilities = () => {
  const result: Array<{
    name: string;
    isGroup?: boolean;
    routeName?: string;
  }> = [];
  const router = useRouter();
  const groups = new Set<string>();
  router
    .getRoutes()
    .filter((route) => !!route.meta.utilityTitle && !!route.meta.utilityGroup)
    .forEach((route) => {
      groups.add(route.meta.utilityGroup as string);
    });
  Array.from(groups)
    .sort()
    .forEach((group) => {
      result.push({ name: group, isGroup: true });
      router
        .getRoutes()
        .filter((route) => route.meta.utilityGroup === group)
        .forEach((route) => {
          result.push({
            name: route.meta.utilityTitle as string,
            routeName: route.name?.toString(),
          });
        });
    });
  return result;
};
