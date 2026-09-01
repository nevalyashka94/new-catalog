import { supabase } from "../lib/supabase";

export interface CarAdminUpdate {
  brandName: string;
  body: string;
  priceFrom: number;
  priceTo: number;
  imageFile?: File | null;
}

export async function updateCarAdmin(carId: number, update: CarAdminUpdate): Promise<string | null> {
  if (!supabase) {
    // Демо-режим без подключённой базы — ничего не сохраняем на сервере.
    return "Supabase не подключён: правки видны только в этой вкладке до перезагрузки. Добавьте VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY, чтобы сохранять по-настоящему.";
  }

  // Находим или создаём бренд по имени — так же, как это делает исходный car-catalog.
  const { data: existingBrand, error: brandLookupError } = await supabase
    .from("brands")
    .select("id")
    .eq("name", update.brandName)
    .maybeSingle();

  if (brandLookupError) throw brandLookupError;

  let brandId: number;
  if (existingBrand) {
    brandId = existingBrand.id;
  } else {
    const { data: newBrand, error: brandInsertError } = await supabase
      .from("brands")
      .insert({ name: update.brandName })
      .select()
      .single();
    if (brandInsertError) throw brandInsertError;
    brandId = newBrand.id;
  }

  const { error: updateError } = await supabase
    .from("cars")
    .update({
      brand_id: brandId,
      body: update.body,
      price_from: update.priceFrom,
      price_to: update.priceTo,
    })
    .eq("id", carId);

  if (updateError) throw updateError;

  if (update.imageFile) {
    const extension = update.imageFile.name.split(".").pop() || "jpg";
    const fileName = `${carId}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("cars")
      .upload(fileName, update.imageFile, { cacheControl: "3600", upsert: true });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage.from("cars").getPublicUrl(fileName);

    const { error: imageUpdateError } = await supabase
      .from("cars")
      .update({ image_url: publicUrlData.publicUrl })
      .eq("id", carId);
    if (imageUpdateError) throw imageUpdateError;
  }

  return null;
}
