"use client";

import React, { useState } from "react";
import { genders } from "./gender-provider";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export default function Gender() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="grid gap-2 justify-start">
      <Label htmlFor="genero">Genero</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? genders.find((gender) => gender.value === value)?.label
              : "Selecione o gênero..."}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Selecione o gênero..."></CommandInput>
            <CommandList>
              <CommandEmpty>Nenhum gênero encontrado</CommandEmpty>
              <CommandGroup>
                {genders.map((gender) => (
                  <CommandItem
                    key={gender.value}
                    value={gender.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === gender.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {gender.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
