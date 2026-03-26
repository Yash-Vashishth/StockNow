'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';

const CountrySelect = ({ value, onChange }: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const [open, setOpen] = useState(false);

    // Get country options
    const countries = countryList().getData();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='country-select-trigger w-70 justify-start'
                >
                    {value ? (
                        <span className='flex items-center gap-2 mr-2 flex-1'>
                            <ReactCountryFlag
                                countryCode={value}
                                svg
                                style={{
                                    width: '20px',
                                    height: '15px',
                                }}
                            />
                            <span>{countries.find((c) => c.value === value)?.label}</span>
                        </span>
                    ) : (
                        <span className='flex items-center gap-2 mr-2 flex-1'>
                            <ReactCountryFlag
                                countryCode='XX'
                                svg
                                style={{
                                    width: '20px',
                                    height: '15px',
                                }}
                            />
                            Select your country...
                        </span>
                    )}
                    <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-70 p-0 bg-gray-800 border-gray-600' align='start'>
                <Command className='bg-gray-800 border-gray-600'>
                    <CommandInput
                        placeholder='Search countries...'
                        className='country-select-input'
                    />
                    <CommandEmpty className='country-select-empty'>
                        No country found.
                    </CommandEmpty>
                    <CommandList className='max-h-60 bg-gray-800 scrollbar-hide-default'>
                        <CommandGroup className='bg-gray-800'>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.value}
                                    value={`${country.label} ${country.value}`}
                                    onSelect={() => {
                                        onChange(country.value);
                                        setOpen(false);
                                    }}
                                    className='country-select-item cursor-pointer'
                                >
                                    <div className='mr-2'>
                                        <ReactCountryFlag
                                            countryCode={country.value}
                                            svg
                                            style={{
                                                width: '20px',
                                                height: '15px',
                                            }}
                                        />
                                    </div>
                                    <span>{country.label}</span>
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4 text-yellow-500',
                                            value === country.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export const CountrySelectField = ({
    name,
    label,
    control,
    error,
    required = false,
}: CountrySelectProps) => {
    return (
        <div className='space-y-2'>
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <CountrySelect value={field.value} onChange={field.onChange} />
                )}
            />
            {error && <p className='text-sm text-red-500'>{error.message}</p>}
            <p className='text-xs text-gray-500'>
                Helps us show market data and news relevant to you.
            </p>
        </div>
    );
};
