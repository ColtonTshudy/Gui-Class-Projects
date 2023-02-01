if __name__ == '__main__':
    dec_val_for_F = 70
    # ASCII is an 8-bit (1 byte) code with 128 characters.
    byte_F = dec_val_for_F.to_bytes(length=1, byteorder='little', signed=True)
    print(str(byte_F, 'ascii'))

    # Let's try converting byte using hex codepoint (character ID)
    # Based on the Unicode symbol, UTF-8 uses 1 to 4 bytes per character.
    print(bytes.fromhex('caa2').decode('utf-8'))
    print(str(byte_F, 'utf-8'))